'use strict';
const yargs = require('yargs');
const pkg = require('./package.json');
const commands = require('./commands.js');

const run = async state => {
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
      state.addCommand({ com, desc });
    },
  });

  yargs.command({
    command: 'read',
    describe: 'Check all commands',
    handler() {
      commands.readCommand(commands.pathFile);
    },
  });

  yargs.command({
    command: 'path',
    describe: 'Show path for file with saved commands',
    handler() {
      commands.getPath();
    },
  });

  yargs.parse();
};

(async () => {
  const path = commands.getSavePath();
  const state = await commands.ShortcState.loadFrom(path);
  return run(state);
})().catch(err => {
  console.error(`something went wrong: ${err.message}`);
});
