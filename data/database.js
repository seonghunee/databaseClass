const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'class',
    user: 'root',
    password: 'SQL$$gns36236'
})

module.exports = pool;