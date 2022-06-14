require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const { deployCommands } = require('../helpers/commandHelpers');

const app = express();

const { PORT } = process.env;

app.get('/test', (req, res) => {
  res.send('Working');
  logger.info('Test endpoint working');
});

app.get('/deploy-commands', (req, res) => {
  logger.info('Recieved GET request to deploy-commands');
  deployCommands();
  res.send('Success');
});

app.listen(PORT, () => {
  logger.info(`Running on Port: ${PORT}`);
});
