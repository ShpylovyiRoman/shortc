'use strict';
const fs = require('fs');
const chalk = require('chalk');
const pathFile = 'input.json';

function ifExist(path) {
  try {
    if (fs.existsSync(path)) {
      return;
    } else {
      fs.writeFileSync(path, '[]');
    }
  } catch (error) {
    console.log(error);
  }
}

function readFile(path) {
  ifExist(path);
  const res = fs.readFileSync(path, 'utf8');
  return res;
}

function addToFile(path, newComm) {
  ifExist(path);
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
      console.log(chalk.green('Command was successful added'))
    );
  });
  return;
}

function addCommand(com, desc, path) {
  console.log(chalk.red(`${com} ${desc}`));
  const data = { command: com, description: desc };
  addToFile(path, data);
}

function readCommand(path) {
  const data = JSON.parse(readFile(path));
  console.log(data);
}

module.exports = {
  addCommand,
  readCommand,
  pathFile,
};
