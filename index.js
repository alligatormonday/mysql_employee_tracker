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
            choices: ["Add Department", "Remove Department", "View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role"],
        }
    ])
    .then(answers => {
        if (answers.list === "View All Employees By Department") {
            // Inquirer prompt asking which department, users input?
            viewAllByDepartment("Human Resources")
        } 
    })
}

// possibly create queries as one object and import
// else if (answers.list === "") {
//     // function()
// }

//  Create addPrompt/INSERT INTO
function addDepartment() {

}

// Create readPrompt 

function viewAllEmployees() {

}

function viewAllByDepartment(deptName) {
    connection.query("SELECT first_name, last_name, department.dept_name FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id WHERE department.dept_name = ?; ", [deptName], function(err, res){
    if (err) throw err;
    console.log(res);
})
}

function viewAllEmployeesByManager() {

}

function viewAllRoles() {

}

// Create updatePrompt




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