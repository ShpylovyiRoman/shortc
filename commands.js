'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

const pathFile = getSavePath();
const FILE_DOESNT_EXIST = 'ENOENT';

const tryReadFile = async path => {
  try {
    const file = await fs.promises.readFile(path, { encoding: 'utf8' });
    return file;
  } catch (err) {
    if (err.code !== FILE_DOESNT_EXIST) throw err;
    // try to create file, because it could be impossible due to another error
    await fs.promises.writeFile(path, '');
    return null;
  }
};

const printCommand = cmd => {
  console.log(chalk.cyan(`- ${cmd.com}`));
  console.log(`\t${chalk.greenBright(cmd.desc)}`);
};
class ShortcState {
  constructor(commands) {
    this.commands = commands;
  }

  addCommand(command) {
    this.commands.push(command);
  }

  static async loadFrom(path) {
    const data = await tryReadFile(path);
    const json = data || '[]';
    const commands = JSON.parse(json);
    return new ShortcState(commands);
  }

  async saveTo(path) {
    const data = JSON.stringify(this.commands);
    return fs.promises.writeFile(path, data);
  }
}

function getSavePath() {
  const currentDir = os.homedir();
  const pth = process.env['SHORTC_PATH'] || currentDir;
  return path.join(pth, 'shortc.json');
}



module.exports = {
  pathFile,
  ShortcState,
  getSavePath,
  printCommand
};
