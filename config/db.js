const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'ammadjahangir',
    password: process.env.DB_PASSWORD || '090078601',
    database: process.env.DB_NAME || 'products_db'
});

module.exports = mySqlPool;
