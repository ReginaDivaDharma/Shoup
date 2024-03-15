const express = require('express');
const path = require('path');
const pool = require('./database.js');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// GET all artworks
router.get('/', (req, res) => {
    pool.query('SELECT artwork_id, artwork_name, artwork_image, artwork_description, \
    user_name as artist_name, artwork_type, sold_artwork_qty \
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

    // construct the base SQL query
    let sql = `SELECT artwork_id, artwork_name, artwork_image, artwork_description, \
    user_name as artist_name, artwork_type, sold_artwork_qty \
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
  
// set up multer storage to make it be stored in artwork folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'shoup', 'public', 'artwork'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// set up multer upload
const upload = multer({ storage: storage });

// POST endpoint to create a new artwork
router.post('/new', upload.single('artwork_image'), (req, res) => {
    const { artwork_name, artwork_description, artwork_type, user_id } = req.body;

    // validate input
    if (!artwork_name || !artwork_description || !artwork_type || !user_id) {
        return res.status(400).send('Missing required fields');
    }

    // check if file was uploaded
    if (!req.file) {
        return res.status(400).send('No image uploaded');
    }

    const artwork_image = req.file;

    // construct destination path for renaming
    const publicImagePath = path.join(__dirname, '..', '..', 'shoup', 'public', 'artwork', artwork_image.filename);

    // move the uploaded file to the artwork folder
    fs.rename(artwork_image.path, publicImagePath, (error) => {
        if (error) {
            console.error('Error moving file:', error);
            fs.unlink(artwork_image.path, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting temporary file:', unlinkError);
                }
                return res.status(500).send('Internal Server Error');
            });
        }

        // Artwork insertion
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

// DELETE endpoint to delete an artwork
router.delete('/delete/:id', (req, res) => {
    const artwork_id = req.params.id;

    const sql = "SELECT artwork_image FROM artwork WHERE artwork_id=?";
    const values = [artwork_id];

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error retrieving artwork image path:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Artwork not found');
            return;
        }

        const artworkImagePath = results[0].artwork_image;

        // Delete the artwork from the database
        const deleteSql = "DELETE FROM artwork WHERE artwork_id=?";
        pool.query(deleteSql, values, (deleteError, deleteResults) => {
            if (deleteError) {
                console.error('Error deleting artwork:', deleteError);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Delete the image file
            fs.unlink(artworkImagePath, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting artwork image:', unlinkError);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.send('Artwork deleted successfully');
            });
        });
    });
});

// PUT endpoint to update an existing artwork
router.put('/update/:id', (req, res) => {

    const sql = "UPDATE artwork SET artwork_name=?, artwork_description=?, artwork_type=? WHERE artwork_id=?";
    const values = [artwork_name, artwork_image, artwork_description, artwork_type, artwork_id];

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Artwork updated successfully');
    });
});

// export the router
module.exports = router;
