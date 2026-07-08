const express = require('express');
const cors = require('cors');

const env = require('./config/env');
const logger = require('./config/logger');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const { globalErrorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api', routes);

app.use(notFound);
app.use(globalErrorHandler);

app.listen(env.port, () => {
  logger.info(`🚀 Server running on http://localhost:${env.port} [${env.nodeEnv}]`);
});