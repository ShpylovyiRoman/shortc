'use strict';
const fs = require('fs');
const chalk = require('chalk');
const os = require('os');
const pathFile = pathFinder();

function pathFinder() {
  let path = process.env['SHORTC_PATH'] + '\\shortc.json';
  if (path !== undefined) {
    return path;
  } else {
    path = os.homedir() + '\\shortc.json';
    return path;
  }
}

function createIfNotExists(path) {
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
  createIfNotExists(path);
  const res = fs.readFileSync(path, 'utf8');
  return res;
}

function addToFile(path, newComm) {
  createIfNotExists(path);
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

function getPath() {
  console.log(chalk.blue(' Your file with saved commands are located there: ') +
  chalk.bgCyan.bold(pathFile));
}

module.exports = {
  addCommand,
  readCommand,
  getPath,
  pathFile,
};
