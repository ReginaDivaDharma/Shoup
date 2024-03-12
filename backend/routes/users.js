const express = require('express');
const path = require('path');
const pool = require('./database.js');
const router = express.Router();

// Define routes for users
router.get('/', (req, res) => {
    pool.query('SELECT * FROM artist', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT * FROM artist WHERE id = ?', [userId], (error, results) => {
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

module.exports = router;
