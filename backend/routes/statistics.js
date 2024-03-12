const express = require('express');
const path = require('path');
const pool = require('./database.js');
const router = express.Router();

// GET merch type and sold quantity
router.get('/artworktype', (req, res) => {
    pool.query('SELECT artwork_type, SUM(sold_artwork_qty) AS total_qty FROM sold_artwork GROUP BY artwork_type; ', (error, results) => {
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
    pool.query('SELECT SUM(sart.sold_artwork_qty) AS total_sold, artist.user_name\
    FROM sold_artwork sart\
    JOIN artwork art ON sart.artwork_id = art.artwork_id\
    JOIN artist ON artist.user_id = art.user_id\
    GROUP BY artist.user_name', (error, results) => {
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
        'SELECT artwork_name, sold_artwork_qty\
        from artwork art\
        left join sold_artwork sart on art.artwork_id = sart.artwork_id', (error, results) => {
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
