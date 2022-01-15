var inquirer = require('inquirer');
const { isMapIterator } = require('util/types');
const mysql = require('mysql2');

// connect to db

// Connect to database

async function main() {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_tracker_database'
    });
    // query database
    const [rows, fields] = await connection.execute('SELECT * FROM department');

    console.table([rows, fields]);
    init(connection);
}





// initial prompt

function init(db) {




    inquirer.prompt([{
            type: 'list',
            message: 'Choose an option',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            name: "initialPrompt"
        }]


    ).then((data) => {
        if (data.initialPrompt === 'view all departments') {
            console.log('loading all Departments')

            db.query("SELECT * FROM department", function(results) {
                console.log(results)
            });
        } else if (data.initialPrompt === 'view all roles') {
            console.log('Viewing all roles')
        } else if (data.initialPrompt === 'view all employees') {
            console.log('Viewing all employees')
        } else if (data.initialPrompt === 'add a department') {
            console.log('add a department')
        } else if (data.initialPrompt === 'add an employee') {
            console.log('add an employee')
        } else if (data.initialPrompt === 'update an employee role') {
            console.log('update an employee role')
        }
    })
}

main();