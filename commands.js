'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');

const pathFile = getSavePath();

const tryReadFile = async path => {
  try {
    const file = await fs.promises.readFile(path, { encoding: 'utf8' });
    return file;
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    await fs.promises.writeFile(path, '');
    return null;
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
  getSavePath
};
