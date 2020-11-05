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
            choices: ["View All Departments", "Add Department", "Remove Department", "View All Employees", "Add Employee", "Remove Employee", "Update Employee Role", "View All Roles", "Add Role", "Remove Role", "Exit"],
        }
    ]).then(answers => {
        if (answers.choice === "Exit") {
            connection.end();
            // View Employees by department - not usable currently
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
        } else if (answers.choice === "Add Employee") {
            addEmployee();
        } else if (answers.choice === "Remove Employee") {
            removeEmployee();
        } else if (answers.choice === "Update Employee Role") {
            updateEmployeeRole()
        } 

    })
}

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

function viewAllRoles() {
    connection.query("SELECT * FROM employee_role", function (err, data) {
        if (err) throw err;
        console.table(data)
        main();
    })

}

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

function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        
        let employee = data.map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id}
        })
        console.log(employee)
        connection.query("SELECT * FROM employee_role", function (err, data) {
            if (err) throw err;
            
            let role = data.map(role => {
                return { name: role.title, value: role.id }
            })
            console.log(role)
        inquirer.prompt([
            
            {
                type: "list",
                name: "update_employee",
                message: "Choose the employee who's role you would like to update:",
                choices: employee
            },

            {
                type: "list",
                name: "update_role",
                message: "Choose the role you would like the employee to have:",
                choices: role
            }
        ]).then(answers => {
            console.log(answers)
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.update_role, answers.update_employee], function (err, res) {
                if (err) throw err;
                console.table(res);
                main();
            })
        })
    })
})
}

function removeDepartment() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        let department = data.map(department => {
            return { name: `${department.dept_name}`, value: department.id }
        })
        console.table(data);
        inquirer.prompt([
            
            {
                type: "list",
                name: "delete_department",
                message: "Choose the department you would like to delete:",
                choices: department
            },
        ]).then(answers => {
            console.log(answers)
            connection.query("DELETE FROM department WHERE id = ?",  answers.delete_department, function (err, res) {
                if (err) throw err;
                console.table(res);
                main();
            })
        })
    })

}

function removeEmployee() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        
        let employee = data.map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id}
        })
        inquirer.prompt([
            
            {
                type: "list",
                name: "delete_employee",
                message: "Choose the employee you would like to delete:",
                choices: employee
            },
        ]).then(answers => {
            console.log(answers)
            connection.query("DELETE FROM employee WHERE id = ?",  answers.delete_employee, function (err, res) {
                if (err) throw err;
                console.table(res);
                main();
            })
        })
})
}

function removeRole() {
    connection.query("SELECT * FROM employee_role", function (err, data) {
        if (err) throw err;
        console.log(data)
        let role = data.map(role => {
            return { name: role.title, value: role.id }
        })
        inquirer.prompt([
            
            {
                type: "list",
                name: "delete_role",
                message: "Choose the role you would like to remove:",
                choices: role
            },
        ]).then(answers => {
            console.log(answers)
            connection.query("DELETE FROM employee_role WHERE id = ?",  answers.delete_role, function (err, res) {
                if (err) throw err;
                console.table(res);
                main();
            })
        })
})
}