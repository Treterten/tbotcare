const fs = require('fs');
const path = require('path');

const logger = require('../logger');

const COMMAND_REGEX = /^.*(?<!index)(.js)$/;

const getCommands = () => {
  const commands = [];
  logger.info('Getting commands');
  const files = fs.readdirSync(path.resolve(__dirname));

  logger.info(`Found command files: ${files}`);
  files.forEach((file) => {
    if (file.match(COMMAND_REGEX)) {
      logger.info(`Adding Command from: ${file}`);
      /* eslint-disable global-require, import/no-dynamic-require */
      commands.push(require(path.resolve(__dirname, file)));
    }
  });
  return commands;
};

module.exports = {
  getCommands,
};
