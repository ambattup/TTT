const express = require('express');
const router = express.Router();
const pool = require('../db').pool;

// READ: Get all products
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Products';
    pool.query(query, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
});

// CREATE: Add a new product
router.post('/add', (req, res) => {
    const { productName, priceValue, categoryItem, quantityLeft } = req.body;
    const query = 'INSERT INTO Products (productName, priceValue, categoryItem, quantityLeft) VALUES (?, ?, ?, ?)';
    pool.query(query, [productName, priceValue, categoryItem, quantityLeft], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json({ message: 'Product added successfully!', productID: results.insertId });
    });
});

// DELETE: Remove a product
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM Products WHERE productID = ?';
    pool.query(query, [req.params.id], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ message: 'Product deleted successfully!' });
    });
});

// UPDATE: Edit a product
router.put('/:id', (req, res) => {
    const { productName, priceValue, categoryItem, quantityLeft } = req.body;
    const query = 'UPDATE Products SET productName = ?, priceValue = ?, categoryItem = ?, quantityLeft = ? WHERE productID = ?';
    pool.query(query, [productName, priceValue, categoryItem, quantityLeft, req.params.id], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ message: 'Product updated successfully!' });
    });
});

module.exports = router;
