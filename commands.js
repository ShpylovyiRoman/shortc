'use strict';
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const os = require('os');

const pathFile = getSavePath();

function getSavePath() {
  const currentDir = os.homedir();
  const pth = 'SHORTC_PATH' in process.env ?
    process.env['SHORTC_PATH'] : currentDir;
  return path.join(pth, 'shortc.json');
}

function createIfNotExists(pth) {
  try {
    if (fs.existsSync(pth)) {
      return;
    } else {
      fs.writeFileSync(pth, '[]');
    }
  } catch (error) {
    console.log(error);
  }
}

function readFile(pth) {
  createIfNotExists(pth);
  console.log(pathFile);
  const res = fs.readFileSync(pth, 'utf8');
  return res;
}

function addToFile(pth, newComm) {
  createIfNotExists(pth);
  fs.readFile(pth, (err, commands) => {
    if (err) throw err;
    const parseJson = JSON.parse(commands);
    parseJson.push(newComm);
    fs.writeFile(
      pth,
      JSON.stringify(parseJson),
      err => {
        if (err) throw err;
      },
      console.log(chalk.green('Command was successful added'))
    );
  });
  return;
}

function addCommand(com, desc, pth) {
  console.log(chalk.red(`${com} ${desc}`));
  const data = { command: com, description: desc };
  addToFile(pth, data);
}

function readCommand(pth) {
  const data = JSON.parse(readFile(pth));
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
