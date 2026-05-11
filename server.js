require('dotenv').config();

const path = require('path');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = Number(process.env.PORT || 3000);
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/free_website'
});

const allowedTables = new Set(['rankings']);
const allowedColumns = new Set([
    'id', 'code', 'name', 'student_id', 'dino_name', 'dino_emoji', 'dino_desc',
    'used_codes', 'coins', 'initial_coins_granted', 'code_exchange_count',
    'courage', 'battle_power', 'created_at', 'updated_at'
]);

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

function fail(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

function assertTable(table) {
    if (!allowedTables.has(table)) throw fail(400, 'Unsupported table');
}

function quoteIdent(name) {
    if (!allowedColumns.has(name)) throw fail(400, `Unsupported column: ${name}`);
    return `"${name}"`;
}

function parseColumns(columns) {
    if (!columns || columns === '*') return '*';
    return String(columns).split(',').map(column => quoteIdent(column.trim())).join(', ');
}

function buildWhere(filters = [], values) {
    if (!Array.isArray(filters) || filters.length === 0) return '';
    return ` where ${filters.map(filter => {
        if (filter.op !== 'eq') throw fail(400, `Unsupported filter operation: ${filter.op}`);
        values.push(filter.value);
        return `${quoteIdent(filter.column)} = $${values.length}`;
    }).join(' and ')}`;
}

function normalizeRows(payload) {
    return Array.isArray(payload) ? payload : [payload || {}];
}

function buildInsert(table, rows, values) {
    const columns = Object.keys(rows[0] || {});
    if (columns.length === 0) throw fail(400, 'Insert payload is empty');
    const placeholders = rows.map(row => `(${columns.map(column => {
        values.push(row[column]);
        return `$${values.length}`;
    }).join(', ')})`);
    return `insert into public.${table} (${columns.map(quoteIdent).join(', ')}) values ${placeholders.join(', ')}`;
}

async function runQuery(body) {
    const { table, operation = 'select', payload, columns = '*', filters = [], order, limit, single, onConflict } = body || {};
    assertTable(table);
    const values = [];
    let sql;

    if (operation === 'select') {
        sql = `select ${parseColumns(columns)} from public.${table}${buildWhere(filters, values)}`;
    } else if (operation === 'insert') {
        sql = `${buildInsert(table, normalizeRows(payload), values)} returning ${parseColumns(columns)}`;
    } else if (operation === 'upsert') {
        const rows = normalizeRows(payload);
        const conflictColumns = String(onConflict || 'name,student_id').split(',').map(column => column.trim());
        const updateColumns = Object.keys(rows[0]).filter(column => !conflictColumns.includes(column));
        sql = buildInsert(table, rows, values);
        sql += ` on conflict (${conflictColumns.map(quoteIdent).join(', ')}) do update set `;
        sql += updateColumns.map(column => `${quoteIdent(column)} = excluded.${quoteIdent(column)}`).join(', ');
        sql += ` returning ${parseColumns(columns)}`;
    } else if (operation === 'update') {
        const updateColumns = Object.keys(payload || {});
        if (updateColumns.length === 0) throw fail(400, 'Update payload is empty');
        sql = `update public.${table} set ${updateColumns.map(column => {
            values.push(payload[column]);
            return `${quoteIdent(column)} = $${values.length}`;
        }).join(', ')}${buildWhere(filters, values)} returning ${parseColumns(columns)}`;
    } else if (operation === 'delete') {
        sql = `delete from public.${table}${buildWhere(filters, values)} returning *`;
    } else {
        throw fail(400, `Unsupported operation: ${operation}`);
    }

    if (order && order.column) sql += ` order by ${quoteIdent(order.column)} ${order.ascending === false ? 'desc' : 'asc'}`;
    if (limit) {
        values.push(Number(limit));
        sql += ` limit $${values.length}`;
    }

    const result = await pool.query(sql, values);
    return single ? (result.rows[0] || null) : result.rows;
}

app.post('/api/query', async (req, res) => {
    try {
        res.json({ data: await runQuery(req.body) });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: { message: error.message, code: error.code } });
    }
});

app.post('/api/rpc/redeem_friend_code', async (req, res) => {
    const { p_name, p_student_id, p_friend_code } = req.body || {};
    try {
        const result = await pool.query(
            'select * from public.redeem_friend_code($1, $2, $3)',
            [p_name, p_student_id, p_friend_code]
        );
        res.json({ data: result.rows[0] || null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: error.message, code: error.code } });
    }
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Local Express app running at http://localhost:${port}`);
});
