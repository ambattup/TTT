const express = require('express');
const app = express();
const path = require('path');
const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/products');
const customersRoutes = require('./routes/customers');
const ordersRoutes = require('./routes/orders');
const orderDetailsRoutes = require('./routes/order_details');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/customers', customersRoutes);
app.use('/orders', ordersRoutes);
app.use('/order-details', orderDetailsRoutes);

// Default route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
