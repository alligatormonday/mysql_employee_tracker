const mysql = require("mysql2");
const inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Limetree001!",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    main()
});


function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What you like to do?",
            choices: ["View All Employees By Department", "View All Departments", "Add Department", "Remove Department", "View All Employees", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "Exit"],
        }
    ]).then(answers => {
        if (answers.choice === "Exit") {
            connection.end();
            // } else if (answers.choice === "View All Employees By Department") {
            //     // Inquirer prompt asking which department, users input?
            //     viewAllEmployeeByDepartment();
        } else if (answers.choice === "View All Departments") {
            viewAllDepartments();
        } else if (answers.choice === "Add Department") {
            addDepartment();
        } else if (answers.choice === "Remove Department") {
            removeDepartment();
        } else if (answers.choice === "View All Roles") {
            viewAllRoles();
        } else if (answers.choice === "Add Role") {
            addRole();
        } else if (answers.choice === "Remove Role") {
            removeRole()
        } else if (answers.choice === "View All Employees") {
            viewAllEmployees();
        } else if (answers.choice === "View All Employees By Manager") {
            viewAllEmployeesByManager();
        } else if (answers.choice === "Add Employee") {
            addEmployee();
        } else if (answers.choice === "Remove Employee") {
            removeEmployee();
        } else if (answers.choice === "Update Employee Role") {
            updateEmployeeRole()
        } else if (answers.choice === "Update Employee Manager") {
            updateEmployeeManager();
        }

    })
}

// possibly create queries as one object and import
// else if (answers.choice === "") {
//     // function()
// }

// Create readPrompt



// function viewAllEmployeeByDepartment() {
//     connection.query("SELECT first_name, last_name, department.dept_name FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id WHERE department.dept_name = ?; ", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         main()
//     })
// }

function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        main()
    })
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data)
        main();
    })
}

function viewAllEmployeesByManager() {

}

function viewAllRoles() {
    connection.query("SELECT * FROM employee_role", function (err, data) {
        if (err) throw err;
        console.table(data)
        main();
    })

}

//  Create addPrompt/INSERT INTO
function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            name: "dept_name",
            message: "Enter the name of the department you would like to add:"
        }
    ).then(answers => {
        connection.query("INSERT INTO department (dept_name) VALUES (?)", [answers.dept_name], function (err, res) {
            if (err) throw err;
            console.table(res);
            main();
        })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.log(data)
        let department = data.map(dept => {
            return { name: dept.dept_name, value: dept.id }
        })
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the title of this role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary of this role:"
            },
            {
                type: "list",
                name: "department_id",
                message: "Choose the department that this role belongs to:",
                choices: department
            }
        ]).then(answers => {
            connection.query("INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)", [answers.title, answers.salary, answers.department_id], function (err, data) {
                if (err) throw err;
                console.log(data);
                main();
            })
        })
    })

}

function addEmployee() {
    connection.query("SELECT * FROM employee_role", function (err, data) {
        if (err) throw err;
        console.log(data)
        let role = data.map(role => {
            return { name: role.title, value: role.id }
        })
        connection.query("SELECT * FROM employee", function (err, data) {
            if (err) throw err;
            let manager = data.map(manager => {
                return { name: `${manager.first_name} ${manager.last_name}`, value: manager.id }
            })
            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Enter the first name of the employee you would like to add:"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Enter the last name of the employee you would like to add:"
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "Choose the role of the employee:",
                    choices: role
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Choose the manager of the employee:",
                    choices: manager
                }
            ]).then(answers => {
                connection.query("INSERT INTO employee SET ?", answers, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    main();
                })
            })
        })

    })
}

// Create updatePrompt
function updateEmployeeRole() {
// query employees and roles
// inquirer prompts
// update query
}

function updateEmployeeManager() {

}

// Delete prompt

function removeDepartment() {

}

function removeEmployee() {

}

function removeRole() {

}

// break choices out into particular function
// think switch/case 

// Inquirer -
// Updating employee role
// Which employee would you like to update?
// Create query for selecting all employees, use the result of this query to make an inquirer question with a dropdown of choices
// Once user selects which employee, you will then make another query to get list of roles and let that become a dropdown for user to choose out of. 
// Then update that employee

// console.table
// pass into an array to visualize as table