const mysql = require('mysql2');

// get the client
// create the connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_tracker_database'

});
// query database
// const [rows, fields] = await connection.execute('SELECT * FROM department');

// console.table([rows, fields]);
// init(connection);


module.exports = connection;