import { Router } from 'express';
import account from '@api/routes/account';

export default () => {
	const app = Router();
	account(app);

	return app
}
