import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoup'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

connection.query('SELECT * FROM user', (error, results, fields) => {
    if (error) {
        console.error('Error executing query: ' + error.stack);
        return;
    }
    console.log('Query results:', results);
});

connection.on('error', (err) => {
    console.error('MySQL database error:', err);
});


