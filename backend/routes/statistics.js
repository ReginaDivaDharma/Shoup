const express = require('express');
const path = require('path');
const pool = require('./database.js');
const router = express.Router();

// GET merch type and sold quantity
router.get('/artworktype', (req, res) => {
    pool.query('SELECT artwork_type, SUM(sold_artwork_qty) AS total_qty FROM artwork GROUP BY artwork_type', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// GET artwork sold by artist barchart
router.get('/user_sold', (req, res) => {
    pool.query('SELECT SUM(art.sold_artwork_qty) AS total_sold, artist.user_name \
    FROM artwork art JOIN artist ON artist.user_id = art.user_id \
    GROUP BY artist.user_name ', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// GET artworks made over the year
router.get('/artworks_year', (req, res) => {
    pool.query(
        'SELECT artwork_name, COALESCE(sold_artwork_qty, 0)\
        from artwork', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Export the router
module.exports = router;
