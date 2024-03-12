const express = require('express');
const path = require('path');
const pool = require('./database.js');
const router = express.Router();

// GET all artworks
router.get('/', (req, res) => {
    pool.query('SELECT artwork_id, artwork_name, artwork_image, artwork_description, \
    user_name as artist_name, artwork_type \
    FROM artwork JOIN artist ON artwork.user_id = artist.user_id \
    ', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.get('/gallery', (req, res) => {
    const { orderBy, selectedArtist, searchText } = req.query;

    let whereQuery = '';

    if (selectedArtist) {
        whereQuery += ` AND user_name = '${selectedArtist}'`;
    } else {
        whereQuery += ''
    }

    if (searchText) {
        whereQuery += ` AND artwork_name LIKE '%${searchText}%'`;
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

// POST endpoint to create a new artwork
router.post('/new', (req, res) => {
    const { artwork_name, artwork_description, artwork_type, user_id } = req.body;

    // Validate input here if needed
    if (!artwork_name || !artwork_description || !artwork_type || !user_id) {
        return res.status(400).send('Missing required fields');
    }

    // Check if file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No image uploaded');
    }

    const artwork_image = req.files.artwork_image; // Assuming the field name is artwork_image

    // Move the uploaded file to public folder
    const uploadedImagePath = artwork_image.tempFilePath;
    const publicImagePath = path.join(__dirname, 'public', 'artwork', artwork_image.name);

    fs.rename(uploadedImagePath, publicImagePath, (error) => {
        if (error) {
            console.error('Error moving file:', error);
            fs.unlink(uploadedImagePath, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting temporary file:', unlinkError);
                }
                return res.status(500).send('Internal Server Error');
            });
        }

        // Handle database insertion
        const sql = `INSERT INTO artwork (artwork_name, artwork_image, artwork_description, artwork_type, user_id) VALUES (?, ?, ?, ?, ?)`;
        const values = [artwork_name, publicImagePath, artwork_description, artwork_type, user_id];

        pool.query(sql, values, (dbError, results) => {
            if (dbError) {
                console.error('Error executing query:', dbError);
                fs.unlink(publicImagePath, (unlinkError) => {
                    if (unlinkError) {
                        console.error('Error deleting uploaded file:', unlinkError);
                    }
                    return res.status(500).send('Internal Server Error');
                });
            }
            res.status(201).send('Artwork created successfully');
        });
    });
});

// Export the router
module.exports = router;
