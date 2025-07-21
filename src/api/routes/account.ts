import { Router } from 'express'
import { accountOpening } from  '@controllers/accountController';
import config from '@config';

const route = Router();

route.post(config.paths.account.path, accountOpening);

export default (app: Router) => {
  app.use('/', route);
};
