var inquirer = require('inquirer');
const { isMapIterator } = require('util/types');
const db = require('./db/db');


require("console.table");

// connect to db

// Connect to database



var a = '';

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
                    message: "enter a role id",
                    name: 'roleId',
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
            addAnEmployee(data);

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
        id: data.roleId,
        title: data.title,
        salary: data.salary,
    })
    init();
}

function addAnEmployee(data) {
    db.query(`SELECT * FROM roles`, (err, res) => {
        console.log(res)
        const occupationArr = res.map((role) => {

            return role.title;
        });
        inquirer.prompt([{
                type: 'input',
                message: "enter a employee first name",
                name: 'firstName',

            }, {
                type: 'input',
                message: "enter a employee last name",
                name: 'lastName',

            }, {
                type: 'list',
                choices: occupationArr,
                message: "enter a role",
                name: 'role',
            }

            , {
                type: 'input',
                message: "enter a manager id",
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
            db.query(`INSERT INTO employee SET ?`, {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: data.roleId,
                manager_id: data.managerId

            });
            init();
        })




    })
}
// UPDATE demo SET name=CASE 
// WHEN id = 2 THEN 'text 2'
// WHEN id = 3 THEN 'text 3'
// END WHERE id IN(2, 3);


function updateAnEmployee() {


    db.query(`SELECT id,first_name, last_name FROM employee`, (err, res) => {

        const employeeId = res.map((employee) => {
            return employee.id
        });

        db.query(`select title,id from roles`, (role_err, role_res) => {
            const rolesChoices = role_res.map((roles) => {
                return roles.id
            });

            inquirer.prompt([{
                        choices: employeeId,
                        message: "Choose an employee by id(if you dont know the name select view employees in prompt)",
                        type: "list",
                        name: 'id3'
                    }, {
                        name: 'roleChoice',
                        choices: rolesChoices,
                        message: "Choose a role",
                        type: "list",

                    }

                ]).then((data) => {

                    db.query(`UPDATE employee SET id=${data.roleChoice} WHERE role_id=${data.id3}`)
                    console.log("updated");
                    init();


                })
                //

            // WHEN id = 2 THEN 'text 2'
            // WHEN id = 3 THEN 'text 3'
            // END WHERE id IN(2, 3);
        })



    })
}

function getJobTitles() {

}