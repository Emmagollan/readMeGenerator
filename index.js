const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const api = require('./api.js');
const generateMarkdown = require('./generateMarkdown.js');

// Inquirer prompts usewr
const questions = [
    {
        type: 'input',
        message: "What is your Github username?",
        name: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please enter your GitHub username.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Enter your title here.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Write a description of your project here.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What are the steps required for installation?",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of use.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "If you would like others to contribute, please provide guidlines here",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "If you created tests for your application, please provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Which license are you using.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);


async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
    
        // Call GitHub api for info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass responses to generateMarkdown
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();
