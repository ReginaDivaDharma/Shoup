const express = require('express');
const cors = require('cors');
const artworksRouter = require('./routes/artworks');
const userRouter = require('./routes/users'); 
const statisticsRouter = require('./routes/statistics'); 
const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use('/artworks', artworksRouter);
app.use('/users',userRouter);
app.use('/statistics',statisticsRouter);

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
