import { Request, Response } from 'express';
import AccountService from '@services/accountService';
import { ResponseTO } from '@helpers/interfaces/response';
import Utilities from '@utils/utilities';

export const accountOpening = async (req: Request, res: Response) => {
  const account: ResponseTO = await new AccountService().accountOpening( req );
  Utilities.loggingReqAndResp(req, res, account);
}
