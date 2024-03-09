const express = require('express');
const mysql = require('mysql2');

const app = express();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    port: 5306,
    database: 'shoup'
});

// get all users
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM user', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// get a specific user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT * FROM user WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.json(results[0]);
    });
});

// get transaction transaction
app.get('/transaction', (req, res) => {
    pool.query('SELECT * FROM transaction', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// get best selling top 3
app.get('/transactionTop3', (req, res) => {
    pool.query('select artwork_name, artwork_image \
    from artworks art \
    right join transaction tc on tc.artwork_id = art.artwork_id \
    ORDER by tc.qty \
    limit 3; ', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// get artworks transaction
app.get('/artwork', (req, res) => {
    pool.query('SELECT * FROM artworks', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
