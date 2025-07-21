import express from 'express';
import config from '@config';
import logger from '@loaders/logger';

import loaders from '@loaders/index';

async function startServer() {
  const app = express()

  await loaders({ expressApp: app });

  app.listen(config.PORT, () => {
    logger.info(`
      ################################################
              Server listening on port: ${config.PORT} 
      ################################################
    `);
  }).on('error', (e: Error) => {
    logger.error(`A problem ocurred: ${e}`);
    process.exit(1);
  });
}

startServer();
