const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    port: 5306,
    database: 'shoup'
});

pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }
    console.log('Query results:', results);
});
