const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 5306,
    database: 'shoup'
});

module.exports = pool;
