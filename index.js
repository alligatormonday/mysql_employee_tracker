const mysql = require("mysql");
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

// Inquirer -
// Updating employee role
// Which employee would you like to update?
// Create query for selecting all employees, use the result of this query to make an inquirer question with a dropdown of choices
// Once user selects which employee, you will then make another query to get list of roles and let that become a dropdown for user to choose out of. 
// Then update that employee

// console.table
// pass into an array to visualize as table



