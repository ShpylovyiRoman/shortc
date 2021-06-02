'use strict';
const yargs = require('yargs');
const pkg = require('./package.json');
const {
  getSavePath,
  ShortcState,
  Command,
} = require('./commands.js');
const chalk = require('chalk');

const EXIT_ERROR = 1;


const run = async state => {
  yargs.version(pkg.version);

  yargs.command({
    command: 'add',
    describe: 'Add command',
    builder: {
      name: {
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
    handler({ name, desc }) {
      state.addCommand(new Command(name, desc));
    },
  });


  yargs.command({
    command: 'read',
    describe: 'Check all commands',
    handler() {
      state.commands.forEach(cmd => {
        cmd.print();
      });
    },
  });

  yargs.command({
    command: 'path',
    describe: 'Show path for file with saved commands',
    handler() {
      const path = getSavePath();
      const colorfullPath = chalk.bgCyan.bold(path);
      console.log(chalk.blue(`Db is located at ${colorfullPath}`));
    },
  });

  yargs.command({
    command: 'find <pattern>',
    describe: 'Search for patterns in each command\'s name and description.' +
      ' For syntax see JavaScript\'s RegExp.',
    builder: () => yargs.positional('pattern', {
      type: 'string',
      describe: 'regular expression pattern'
    }),
    handler({ pattern }) {
      const regexp = new RegExp(pattern);
      for (const cmd of state.commands) {
        if (regexp.test(cmd.name) || regexp.test(cmd.desc)) {
          cmd.print();
        }
      }
    },
  });

  yargs.parse();
};

(async () => {
  const path = getSavePath();
  const state = await ShortcState.loadFrom(path);
  await run(state);
  return state.saveTo(path);
})().catch(err => {
  console.error(`Error: ${err.message}`);
  process.exitCode = EXIT_ERROR;
});
