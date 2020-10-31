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
            name: "list",
            message: "What you like to do?",
            choices: ["View All Employees By Department", "Add Department", "Remove Department", "View All Employees", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "Exit"],
        }
    ]).then(answers => {
        if (answers.list === "View All Employees By Department") {
            // Inquirer prompt asking which department, users input?
            viewAllByDepartment("Human Resources");
        } else if (answers.list === "Add Department") {
            addDepartment();
        } else if (answers.list === "Remove Department") {
            removeDepartment();
        } else if (answers.list === "View All Employees") {
            viewAllEmployees();
        } else if (answers.list === "View All Employees By Manager") {
            viewAllEmployeesByManager();
        } else if (answers.list === "Add Employee") {
            addEmployee();
        } else if (answers.list === "Remove Employee") {
            removeEmployee();
        } else if (answers.list === "Update Employee Role") {
            updateEmployeeRole()
        } else if (answers.list === "Update Employee Manager") {
            updateEmployeeManager();
        } else if (answers.list === "View All Roles") {
            viewAllRoles();
        } else if (answers.list === "Add Role") {
            addRole();
        } else if (answers.list === "Remove Role") {
            removeRole()
        } else if (answers.list === "Exit") {
            connection.end();
        }

    })
}


// possibly create queries as one object and import
// else if (answers.list === "") {
//     // function()
// }



// Create readPrompt 

function viewAllByDepartment(deptName) {
    connection.query("SELECT first_name, last_name, department.dept_name FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id WHERE department.dept_name = ?; ", [deptName], function (err, res) {
        if (err) throw err;
        console.log(res);
    })
}

function viewAllEmployees() {

}



function viewAllEmployeesByManager() {

}

function viewAllRoles() {

}

//  Create addPrompt/INSERT INTO
function addDepartment() {
    connection.query("INSERT INTO department", function (req, res) {

    })
}

function addEmployee() {

}

function addRole() {

}

// Create updatePrompt
function updateEmployeeRole() {

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