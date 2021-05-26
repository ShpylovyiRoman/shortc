'use strict';
const fs = require('fs');
const chalk = require('chalk');
const pathFile = 'input.json';

function readFile(path) {
  const res = fs.readFileSync(path, 'utf8');
  return res;
}

function addToFile(path, newComm) {
  fs.readFile(path, (err, commands) => {
    if (err) throw err;
    const parseJson = JSON.parse(commands);
    parseJson.push(newComm);
    fs.writeFile(
      path,
      JSON.stringify(parseJson),
      err => {
        if (err) throw err;
      },
    );
  });
  return;
}

function addCommand(com, desc) {
  console.log(chalk.cyan(
    `  Command: ${com} \n    Description: ${desc}`));
  const data = { command: com, description: desc };
  addToFile(pathFile, data);
  console.log(chalk.greenBright('Command was successful added'));
}

function readCommand(pathFile) {
  const data = JSON.parse(readFile(pathFile));
  console.log(chalk.yellow('Command: \n    Description'));
  data.forEach(comm => {
    console.log('- ' + chalk.cyan(comm.command) + '\n        ' +
        chalk.greenBright(comm.description) + '\n');
  });
}

module.exports = {
  addCommand,
  readCommand,
  pathFile
};
