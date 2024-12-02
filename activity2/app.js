/*
    SETUP
*/
var express = require('express');  // Import Express for the web server
var app = express();               // Create an Express instance
PORT = 2829;                       // Define the port number

var db = require('./db-connector'); // Import the MySQL connection pool from db-connector.js

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

/*
    ROUTES
*/

// Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve the index.html file
});

// Products page
app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/public/products.html'); // Serve the products.html file
});

// API: Get all products (READ)
app.get('/api/products', (req, res) => {
    const query = `SELECT productID, productName, priceValue, categoryItem, quantityLeft FROM Products`;
    db.pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching products');
        } else {
            res.json(results);
        }
    });
});

// API: Add a new product (CREATE)
app.post('/api/products', (req, res) => {
    const { productName, priceValue, categoryItem, quantityLeft } = req.body;
    const query = `
        INSERT INTO Products (productName, priceValue, categoryItem, quantityLeft)
        VALUES (?, ?, ?, ?)
    `;
    db.pool.query(query, [productName, priceValue, categoryItem, quantityLeft], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding product');
        } else {
            res.status(201).send('Product added successfully');
        }
    });
});

// API: Update a product (UPDATE)
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { newQuantity, newPrice } = req.body;
    const query = `
        UPDATE Products 
        SET quantityLeft = ?, priceValue = ?
        WHERE productID = ?
    `;
    db.pool.query(query, [newQuantity, newPrice, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating product');
        } else {
            res.send('Product updated successfully');
        }
    });
});

// API: Delete a product (DELETE)
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Products WHERE productID = ?`;
    db.pool.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting product');
        } else {
            res.send('Product deleted successfully');
        }
    });
});

// API: Get distinct product categories for dropdown
app.get('/api/products/categories', (req, res) => {
    const query = `SELECT DISTINCT categoryItem FROM Products`;
    db.pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching categories');
        } else {
            res.json(results);
        }
    });
});

/*
    ROUTES - Customers
*/

// Route: Get all customers (READ)
app.get('/api/customers', (req, res) => {
    const query = `SELECT customerID, firstName, emailAddress, phoneNumber FROM Customers`;
    db.pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching customers');
        } else {
            res.json(results);
        }
    });
});

// Route: Add a new customer (CREATE)
app.post('/api/customers', (req, res) => {
    const { firstName, emailAddress, phoneNumber } = req.body;
    const query = `
        INSERT INTO Customers (firstName, emailAddress, phoneNumber)
        VALUES (?, ?, ?)
    `;
    db.pool.query(query, [firstName, emailAddress, phoneNumber], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding customer');
        } else {
            res.status(201).send('Customer added successfully');
        }
    });
});

// Route: Update a customer (UPDATE)
app.put('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, emailAddress, phoneNumber } = req.body;
    const query = `
        UPDATE Customers 
        SET firstName = ?, emailAddress = ?, phoneNumber = ?
        WHERE customerID = ?
    `;
    db.pool.query(query, [firstName, emailAddress, phoneNumber, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating customer');
        } else {
            res.send('Customer updated successfully');
        }
    });
});

// Route: Delete a customer (DELETE)
app.delete('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Customers WHERE customerID = ?`;
    db.pool.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting customer');
        } else {
            res.send('Customer deleted successfully');
        }
    });
});


/*
    LISTENER
*/
app.listen(PORT, () => {
    console.log(`Express started on http://classmysql.engr.oregonstate.edu:${PORT}; press Ctrl-C to terminate.`);
});
