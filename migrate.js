const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://xtymdgdnbeukkgwfmgzu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ixzG850Es4Amfs_32MZSlg_xwx5XKja';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

async function migrate() {
    console.log('Fetching users from Supabase...');
    const { data, error } = await supabase
        .from('rankings')
        .select('name,student_id,code');

    if (error) {
        console.error('Error fetching users:', error);
        process.exitCode = 1;
        return;
    }

    if (!data || data.length === 0) {
        console.log('No users found to migrate.');
        return;
    }

    const seenStudents = new Set();
    const duplicateStudents = [];
    for (const user of data) {
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

    const usedCodes = new Set(data.map(user => user.code).filter(Boolean));
    const duplicateCodes = data
        .map(user => user.code)
        .filter((code, index, codes) => code && codes.indexOf(code) !== index);

    if (duplicateCodes.length === 0) {
        console.log('No duplicate codes found. Nothing to migrate.');
        return;
    }

    console.log(`Found ${new Set(duplicateCodes).size} duplicate code value(s). Reassigning only duplicate rows...`);

    const seenCodes = new Set();
    for (const user of data) {
        if (!user.code || !seenCodes.has(user.code)) {
            if (user.code) seenCodes.add(user.code);
            continue;
        }

        const newCode = generateCode(usedCodes);
        console.log(`Updating ${user.name} (${user.student_id}): ${user.code} -> ${newCode}`);

        const { error: updateError } = await supabase
            .from('rankings')
            .update({ code: newCode })
            .eq('name', user.name)
            .eq('student_id', user.student_id);

        if (updateError) {
            console.error(`Failed to update ${user.name} (${user.student_id}):`, updateError);
            process.exitCode = 1;
        }
    }

    console.log('Migration finished.');
}

migrate().catch(error => {
    console.error('Unexpected migration failure:', error);
    process.exitCode = 1;
});
