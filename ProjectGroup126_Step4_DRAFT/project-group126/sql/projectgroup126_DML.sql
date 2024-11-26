-- Racket Supply Database - Data Manipulation Language (DML) Queries
-- Authors: Philip Ambattu & Shushanna Petrosyan  
-- Project Group 126

-- NOTE ':' character being used to denote the variables that will have data from the backend programming language


-- Customers Table CRUD
-- Inserts a new customer into Customers table with dynamic values
INSERT INTO Customers (firstName, emailAddress, phoneNumber)
VALUES (:firstName, :emailAddress, :phoneNumber);

-- Retrieves all customer details from the Customers table
SELECT customerID, firstName, emailAddress, phoneNumber FROM Customers;

-- Updates customer information for a specific customerID
UPDATE Customers
SET firstName = :newFirstName, emailAddress = :newEmail, phoneNumber = :newPhone
WHERE customerID = :customerID;

-- Deletes a customer by customerID
DELETE FROM Customers
WHERE customerID = :customerID;


-- Products Table CRUD
-- Inserts a new product into the Products table
INSERT INTO Products (productName, priceValue, categoryItem, quantityLeft)
VALUES (:productName, :priceValue, :categoryItem, :quantityLeft);

-- Selects all product details from the Products table
SELECT productID, productName, priceValue, categoryItem, quantityLeft FROM Products;

-- Updates the quantity left and price of a specific product by productID
UPDATE Products
SET quantityLeft = :newQuantity, priceValue = :newPrice
WHERE productID = :productID;

-- Deletes a product by productID
DELETE FROM Products
WHERE productID = :productID;


-- Orders Table CRUD
-- Inserts a new order specifying customerID, current date/time, total amount, and initial status
INSERT INTO Orders (customerID, orderDate, totalAmount, status)
VALUES (:customerID, CURRENT_TIMESTAMP, :totalAmount, 'Pending');

-- Retrieves all orders associated with a specific customerID
SELECT orderID, customerID, orderDate, totalAmount, status FROM Orders
WHERE customerID = :customerID;

-- Updates the status of an existing order by orderID
UPDATE Orders
SET status = :newStatus
WHERE orderID = :orderID;

-- Deletes an order by orderID
DELETE FROM Orders
WHERE orderID = :orderID;


-- OrderDetails Table CRUD (Intersection Table)
-- Inserts details of a product in an order including quantity and individual price
INSERT INTO OrderDetails (orderID, productID, quantity, individualPrice)
VALUES (:orderID, :productID, :quantity, :individualPrice);

-- Retrieves all product details for a specific order from OrderDetails
SELECT orderDetailID, orderID, productID, quantity, individualPrice FROM OrderDetails
WHERE orderID = :orderID;

-- Deletes a product entry from an order by orderDetailID
DELETE FROM OrderDetails
WHERE orderDetailID = :orderDetailID;


-- Dynamic Drop-Down / Search Requirement
-- Selects distinct product categories for dynamic dropdown menus in the frontend application
SELECT DISTINCT categoryItem FROM Products;
