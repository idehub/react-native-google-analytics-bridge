#!/usr/local/bin/node
const inquirer = require('inquirer');

inquirer.prompt([{
  message: 'Please, insert here your GA token:',
  name: 'GAToken'
}], (answers) => {
    console.log(answers);
});
