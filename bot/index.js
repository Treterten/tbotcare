require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const logger = require('../logger');
const { getCommands } = require('../commands');

const commands = getCommands();
const { TOKEN } = process.env;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.commands = new Collection();

commands.forEach((command) => {
  client.commands.set(command.data.name, command);
});

client.once('ready', () => {
  logger.info('Ready!');
});

client.on('messageCreate', async () => {
  logger.info('Message Recieved.');
});

client.on('interactionCreate', async (interaction) => {
  logger.info('Interaction Start');
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  logger.info(`Recieved Command: ${commandName}`);
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }

  logger.info('Interaction end');
});

client.login(TOKEN);
