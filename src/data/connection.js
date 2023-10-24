const { Pool } = require('pg');

const pool = new Pool({
    host: 'isabelle.db.elephantsql.com',
    port: '5432',
    user: 'qxlnqrct',
    password: '7yfjCZS-A4ML5zv9sFnVYQwezvBm4mcU',
    database: 'qxlnqrct'
});

module.exports = pool;