'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');

const pathFile = getSavePath();

const tryReadFile = async path => {
  try {
    const file = await fs.promises.readFile(path);
    return file;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    }
    throw err;
  }
};

class ShortcState {
  constructor(commands) {
    this.commands = commands;
  }

  addCommand(command) {
    this.commands.push(command);
  }

  static async loadFrom(path) {
    const data = (await tryReadFile(path)) || '[]';
    const commands = await JSON.parse(data);
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
  getSavePath
};
