'use strict';
const yargs = require('yargs');
const pkg = require('./package.json');
const commands = require('./commands.js');

yargs.version(pkg.version);

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
    commands.addCommand(com, desc, commands.pathFile);
  },
});

yargs.command({
  command: 'read',
  describe: 'Check all commands',
  handler() {
    commands.readCommand(commands.pathFile);
  },
});

yargs.parse();

//node .\shortc.js add --com='git add' --desc='This command can help'
