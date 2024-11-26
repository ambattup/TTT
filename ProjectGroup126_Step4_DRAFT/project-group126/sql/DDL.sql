SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;

CREATE TABLE Customers (
    customerID INT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    emailAddress VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(15)
);

CREATE TABLE Products (
    productID INT PRIMARY KEY,
    productName VARCHAR(100) NOT NULL,
    priceValue DECIMAL(10,2) NOT NULL,
    categoryItem VARCHAR(50) NOT NULL,
    quantityLeft INT NOT NULL
);

CREATE TABLE Orders (
    orderID INT PRIMARY KEY,
    customerID INT,
    orderDate DATETIME NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
);

CREATE TABLE OrderDetails (
    orderDetailID INT PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT NOT NULL,
    individualPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products(productID) ON DELETE CASCADE
);

INSERT INTO Customers (customerID, firstName, emailAddress, phoneNumber) VALUES
(1, 'Alice', 'alice@example.com', '123-456-7890'),
(2, 'Bob', 'bob@example.com', '234-567-8901'),
(3, 'Carol', 'carol@example.com', '345-678-9012');

INSERT INTO Products (productID, productName, priceValue, categoryItem, quantityLeft) VALUES
(101, 'Tennis Racket Pro', 99.99, 'Rackets', 50),
(102, 'Tennis Balls (6pk)', 19.99, 'Balls', 200),
(103, 'Tennis Shoes', 79.99, 'Footwear', 30);

INSERT INTO Orders (orderID, customerID, orderDate, totalAmount, status) VALUES
(1001, 1, '2023-01-15 10:30:00', 119.98, 'Completed'),
(1002, 2, '2023-02-17 14:45:00', 99.99, 'Pending'),
(1003, 3, '2023-03-20 09:00:00', 139.97, 'Completed');

INSERT INTO OrderDetails (orderDetailID, orderID, productID, quantity, individualPrice) VALUES
(1, 1001, 101, 1, 99.99),
(2, 1001, 102, 1, 19.99),
(3, 1002, 101, 1, 99.99),
(4, 1003, 101, 1, 99.99),
(5, 1003, 103, 1, 39.98);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
