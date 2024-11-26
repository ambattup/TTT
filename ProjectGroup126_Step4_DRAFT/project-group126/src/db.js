const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu', 
    user: 'CHANGE',             
    password: 'CHANGE',            
    database: 'CHANGE'   
});

// Export the pool
module.exports.pool = pool;
