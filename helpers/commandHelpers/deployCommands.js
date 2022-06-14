require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { getCommands } = require('../../commands');
const logger = require('../../logger');

let commands = getCommands();
const { CLIENT_ID, TOKEN } = process.env;

const rest = new REST({ version: '10' }).setToken(TOKEN);

module.exports = () => {
  commands = commands.map((command) => command.data.toJSON());
  rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => logger.info('Successfully registered application commands.'))
    .catch(logger.error);
};
