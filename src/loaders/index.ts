import expressLoader from './express';
import logger from './logger';

import { Application } from 'express';

export default async ({ expressApp }: { expressApp: Application }) => {

  expressLoader({ app: expressApp });
  logger.notice('Express loaded ✌️');
}