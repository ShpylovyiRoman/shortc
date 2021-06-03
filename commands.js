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
    await fs.promises.writeFile(path, '');
    return null;
  }
};

class Command {
  constructor(name, desc) {
    this.name = name.trim();
    this.desc = desc.trim();
  }

  print() {
    console.log(chalk.cyan(`- ${this.name}`));
    console.log(`\t${chalk.greenBright(this.desc)}`);
  }
}

class ShortcState {
  constructor(commands) {
    this.cmds = commands.reduce((map, cmd) => {
      map.set(cmd.name, cmd);
      return map;
    }, new Map());
  }

  addCommand(command) {
    this.cmds.set(command.name, command);
  }

  removeCommand(name) {
    const existed = this.cmds.delete(name);
    if (!existed) {
      throw new Error(`command '${name}' does not exists`);
    }
  }

  static async loadFrom(path) {
    const data = await tryReadFile(path);
    const json = data || '[]';
    const array = JSON.parse(json);
    const commands = array.map(({ name, desc }) => new Command(name, desc));
    return new ShortcState(commands);
  }

  async saveTo(path) {
    const data = JSON.stringify(this.commands);
    return fs.promises.writeFile(path, data);
  }

  get commands() {
    return [...this.cmds.values()];
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
  Command
};
