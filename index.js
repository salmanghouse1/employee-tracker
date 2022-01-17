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
            viewAllDepartments();




        } else if (data.initialPrompt === 'view all roles') {
            console.log('Viewing all roles');
            viewAllRoles();
        } else if (data.initialPrompt === 'view all employees') {
            console.log('Viewing all employees')
            viewAllEmployees();
        } else if (data.initialPrompt === 'add a department') {
            inquirer.prompt([{
                type: 'input',
                message: "enter a department",
                name: 'departmentName'
            }]).then((data) => {
                addADepartment(data);
            })
        } else if (data.initialPrompt === 'add a role') {
            inquirer.prompt([{
                    type: 'input',
                    message: "enter a role title",
                    name: 'title',

                }, {
                    type: 'input',
                    message: "enter a salary",
                    name: 'salary',
                    validate: function(salary) {
                        // Regex mail check (return true if valid mail)

                        let isnum = /^\d+$/.test(salary);
                        if (isnum) {
                            console.log("value accepted")
                            return true

                        } else {
                            console.log('must be a number, no commas and no letters or special chars')
                        }
                    }

                },
                {
                    type: 'input',
                    message: "enter a dept id",
                    name: 'deptId',
                    validate: function(deptId) {
                        // Regex mail check (return true if valid mail)

                        let isnum = /^\d+$/.test(deptId);
                        if (isnum) {
                            console.log("value accepted")
                            return true

                        } else {
                            console.log('must be a number, no commas and no letters or special chars')
                        }
                    }

                }
            ]).then((data) => {
                addARole(data);
            })
        } else if (data.initialPrompt === 'add an employee') {
            console.log('add an employee');
            inquirer.prompt([{
                    type: 'input',
                    message: "enter a employee first name",
                    name: 'firstName',

                }, {
                    type: 'input',
                    message: "enter a employee last name",
                    name: 'lastName',

                }, {
                    type: 'input',
                    message: "enter a role id",
                    name: 'roleId',
                    validate: function(roleId) {
                        // Regex mail check (return true if valid mail)

                        let isnum = /^\d+$/.test(roleId);
                        if (isnum) {
                            console.log("value accepted")
                            return true

                        } else {
                            console.log('must be a number, no commas and no letters or special chars')
                        }
                    }

                },
                {
                    type: 'input',
                    message: "enter a manager Id",
                    name: 'managerId',
                    validate: function(managerId) {
                        // Regex mail check (return true if valid mail)

                        let isnum = /^\d+$/.test(managerId);
                        if (isnum) {
                            console.log("value accepted")
                            return true

                        } else {
                            console.log('must be a number, no commas and no letters or special chars')
                        }
                    }

                }
            ]).then((data) => {
                addAnEmployee(data);
            })
        } else if (data.initialPrompt === 'update an employee role') {
            console.log('update an employee role')
            updateAnEmployee();
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
    db.query(`SELECT * FROM department`, (err, res) => {
        console.table(res);
        init();
    })

}

function viewAllRoles() {
    db.query(`SELECT * FROM roles`, (err, res) => {
        console.table(res);
        init();
    })

}

function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, res) => {
        console.table(res);
        init();
    })
}

function addADepartment(data) {
    db.query(`INSERT INTO department SET ?`, {
        name: data.departmentName,


    })
    init();
}


function addARole(data) {
    db.query(`INSERT INTO roles SET ?`, {
        title: data.title,
        salary: data.salary,
        department_Id: data.deptId
    })
    init();
}

function addAnEmployee(data) {
    db.query(`INSERT INTO employee SET ?`, {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: data.roleId,
        manager_id: data.managerId

    })
    init();
}

// UPDATE demo SET name=CASE 
// WHEN id = 2 THEN 'text 2'
// WHEN id = 3 THEN 'text 3'
// END WHERE id IN(2, 3);


function updateAnEmployee() {
    db.query(`SELECT first_name, last_name FROM employee`, (err, res) => {




        inquirer.prompt([{
            choices: res,
            message: "Choose an employee",
            type: "list",
            name: 'updateEmployeeRole'
        }])

    })
}