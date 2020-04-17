const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "teste"
});

connection.query(
    'SELECT * FROM users', (err, result, fields) => {
        console.log(fields);
        console.log(result);
    });

connection.query(
    'SELECT * FROM users WHERE id > ? ',
    [2],
    (err, results) => {
        // console.log(results);
    }
);