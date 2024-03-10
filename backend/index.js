const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 5306,
    database: 'shoup'
});

app.get('/users', (req, res) => {
    pool.query('SELECT * FROM artist', (error, results) => {
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

// get merch type and sold quantity
app.get('/artworktype', (req, res) => {
    pool.query('SELECT artwork_type, SUM(sold_artwork_qty) AS total_qty FROM sold_artwork GROUP BY artwork_type; ', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// get artwork sold by artist barchart
app.get('/user_sold', (req, res) => {
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

// get artworks 
app.get('/artwork', (req, res) => {
    const { orderBy, selectedArtist, searchText } = req.query;

    let whereQuery = '';

    if (selectedArtist) {
        whereQuery += ` AND user_name = '${selectedArtist}'`;
    } else {
        whereQuery += ''
    }

    if (searchText) {
        whereQuery += ` AND artwork_name LIKE '${searchText}'`;
    }else {
        whereQuery += ''
    }

    // Construct the base SQL query
    let sql = `SELECT artwork_id, artwork_name, artwork_image, artwork_description, \
    user_name as artist_name, artwork_type \
    FROM artwork JOIN artist ON artwork.user_id = artist.user_id \
    WHERE TRUE ${whereQuery} \
    ORDER BY artwork_name ${orderBy} \
    `;

    pool.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});



// get artworks made over the year
app.get('/artworks_year', (req, res) => {
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

// start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
