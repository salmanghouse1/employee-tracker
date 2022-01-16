var inquirer = require('inquirer');
const { isMapIterator } = require('util/types');
const db = require('./db/db');



require("console.table");



// connect to db

// Connect to database





// initial prompt

function init() {




    inquirer.prompt([{
            type: 'list',
            message: 'Choose an option',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            name: "initialPrompt"
        }]


    ).then((data) => {
        if (data.initialPrompt === 'view all departments') {
            console.log('loading all Departments')

            viewAllDepartments();
            init();




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

db.connect((err) => {
    if (err) {
        throw err
    } else {

        console.log("connected")
        init();

    }
})

function viewAllDepartments() {
    const viewAllDepartmentsVar = db.query(`SELECT * FROM department`, (err, res) => {
        console.table(res)
    });

}