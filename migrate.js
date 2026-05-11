require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/free_website'
});

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 6;

function generateCode(usedCodes) {
    for (let attempt = 0; attempt < 100; attempt++) {
        let code = '';
        for (let i = 0; i < CODE_LENGTH; i++) {
            code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
        }

        if (!usedCodes.has(code)) {
            usedCodes.add(code);
            return code;
        }
    }

    throw new Error('Could not generate a unique code after 100 attempts.');
}

async function migrateDuplicateCodes() {
    const client = await pool.connect();
    try {
        console.log('Checking local PostgreSQL rankings data...');
        const { rows } = await client.query('select id, name, student_id, code from public.rankings order by id');

        if (rows.length === 0) {
            console.log('No users found to migrate.');
            return;
        }

        const seenStudents = new Set();
        const duplicateStudents = [];
        for (const user of rows) {
            const key = `${user.name}::${user.student_id}`;
            if (seenStudents.has(key)) duplicateStudents.push(key);
            seenStudents.add(key);
        }

        if (duplicateStudents.length > 0) {
            console.error('Duplicate name/student_id rows exist. Clean these before running code migration:');
            console.error([...new Set(duplicateStudents)].join('\n'));
            process.exitCode = 1;
            return;
        }

        const usedCodes = new Set(rows.map(user => user.code).filter(Boolean));
        const duplicateCodes = rows
            .map(user => user.code)
            .filter((code, index, codes) => code && codes.indexOf(code) !== index);

        if (duplicateCodes.length === 0) {
            console.log('No duplicate codes found. Nothing to migrate.');
            return;
        }

        console.log(`Found ${new Set(duplicateCodes).size} duplicate code value(s). Reassigning duplicate rows...`);
        await client.query('begin');

        const seenCodes = new Set();
        for (const user of rows) {
            if (!user.code || !seenCodes.has(user.code)) {
                if (user.code) seenCodes.add(user.code);
                continue;
            }

            const newCode = generateCode(usedCodes);
            console.log(`Updating ${user.name} (${user.student_id}): ${user.code} -> ${newCode}`);
            await client.query('update public.rankings set code = $1 where id = $2', [newCode, user.id]);
        }

        await client.query('commit');
        console.log('Migration finished.');
    } catch (error) {
        await client.query('rollback').catch(() => {});
        console.error('Migration failed:', error);
        process.exitCode = 1;
    } finally {
        client.release();
        await pool.end();
    }
}

migrateDuplicateCodes();
