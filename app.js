const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function questionOne (){
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee type are you creating?",
            name: "role",
            choices: ["Engineer", "Intern", "Manager", "None"]
        }
    ]).then(function ({role}){
        switch(role){
            case "Engineer":
                createEngineer();
                break;
            
            case "Intern":
                createIntern();
                break;

            case "Manager":
                createManager();
                break;

            case "None":
                fs.writeFile(outputPath, render(employees), (err) =>{
                    if(err){
                        throw err
                    }
                })
                break;

            default:
                break;
        }
    })
}

function createEngineer(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter employee ID number:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter employee email:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter employee Github username:",
            name: "github"
        }
    ]).then(answers =>{
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        employees.push(newEngineer);
        questionOne();
    })
}

function createIntern(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter employee ID number:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter employee email:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter employee school:",
            name: "school"
        }
    ]).then(answers => {
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
        employees.push(newIntern)
        questionOne()
    })
}

function createManager(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name:",
            name: "name"
        },
        {
            type: "input",
            message: "Enter employee ID number:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter employee email:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter office number:",
            name: "officeNumber"
        }
    ]).then(answers =>{
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        // console.log(newManager)
        employees.push(newManager)
        // console.log(employees)
        questionOne()
    })
}

questionOne();

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
