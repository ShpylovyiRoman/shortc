'use strict';
const fs = require('fs');

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
        console.log('Command was successful added')
      );
    });
    return;
  }
  
function addCommand (com, desc) {
    console.log(chalk.red(`${com} ${desc}`));
    const data = { command: com, description: desc };
    addToFile(pathFile, data);
};

function readCommand (pathFile) {
    const data = JSON.parse(readFile(pathFile));
    console.log(data);
};

module.exports = {
    addCommand,
    readCommand
};