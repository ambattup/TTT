const express = require('express');
const router = express.Router();
const path = require('path');

// Route for the home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route for 404 (not found)
router.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});

module.exports = router;
