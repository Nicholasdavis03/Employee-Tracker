const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

// Function to establish database connection
async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nis846822',
    database: 'employee_db'
  });
  return connection;
}

// Function to display options menu
async function displayMenu() {
  console.log('Welcome to the Employee Management System!');
  while (true) {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    });

    switch (choice) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting application...');
        process.exit();
    }
  }
}

// Function to view all departments
async function viewAllDepartments() {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute('SELECT * FROM departments');
  console.table(rows);
  connection.end();
}

// Function to view all roles
async function viewAllRoles() {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute('SELECT * FROM roles');
  console.table(rows);
  connection.end();
}

// Function to view all employees
async function viewAllEmployees() {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute('SELECT * FROM employees');
  console.table(rows);
  connection.end();
}

// Function to add a department
async function addDepartment() {
  const { departmentName } = await inquirer.prompt({
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the department:'
  });

  const connection = await connectToDatabase();
  await connection.execute('INSERT INTO departments (department_name) VALUES (?)', [departmentName]);
  console.log('Department added successfully!');
  connection.end();
}

// Start the application
async function main() {
  await displayMenu();
}

main().catch(console.error);
