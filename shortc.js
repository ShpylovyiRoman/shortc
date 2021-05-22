'use strict';
const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const pathFile = 'input.json';
yargs.version('0.0.1');

function readFile(path) {
  const res = fs.readFileSync(path, 'utf8');
  return res;
}

function addCommandtoFile(path, newComm) {
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

const addComm = (com, desc) => {
  console.log(chalk.red(`${com} ${desc}`));
  const data = { command: com, description: desc };
  addCommandtoFile(pathFile, data);
};

yargs.command({
  command: 'add',
  describe: 'Add command',
  builder: {
    com: {
      type: 'string',
      demandOption: true,
      describe: 'Add shortcut name',
    },
    desc: {
      type: 'string',
      demandOption: true,
      describe: 'Add shortcut description',
    },
  },
  handler({ com, desc }) {
    addComm(com, desc);
  },
});

yargs.command({
  command: 'read',
  describe: 'Check all commands',
  handler() {
    const data = JSON.parse(readFile(pathFile));
    console.log(data);
  },
});

yargs.parse();

//node .\shortc.js add --com='git add' --desc='This command can help'
