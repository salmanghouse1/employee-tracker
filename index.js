var inquirer = require('inquirer');
const { isMapIterator } = require('util/types');

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
            console.log('Selected Departments')
        } else if (data.initialPrompt === 'view all roles') {

        } else if (data.initialPrompt === 'view all employees') {

        } else if (data.initialPrompt === 'add a department') {

        } else if (data.initialPrompt === 'add an employee') {

        } else if (data.initialPrompt === 'update an employee role') {

        }
    })
}


init();