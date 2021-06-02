'use strict';
const yargs = require('yargs');
const pkg = require('./package.json');
const commands = require('./commands.js');
const chalk = require('chalk');

const EXIT_ERROR = 1;

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
      console.dir(state.commands);
    },
  });

  yargs.command({
    command: 'path',
    describe: 'Show path for file with saved commands',
    handler() {
      const path = commands.getSavePath();
      const colorfullPath = chalk.bgCyan.bold(path);
      console.log(chalk.blue(`Db is located at ${colorfullPath}`));
    },
  });

  yargs.parse();
};

(async () => {
  const path = commands.getSavePath();
  const state = await commands.ShortcState.loadFrom(path);
  await run(state);
  return state.saveTo(path);
})().catch(err => {
  console.error(`Error: ${err.message}`);
  process.exitCode = EXIT_ERROR;
});
