import { Router } from 'express'
import { firstController } from  '@controllers/accountController';
import config from '@config';

const route = Router();

route.post("config.paths.account.path", firstController );

export default (app: Router) => {
  app.use('/', route);
};
