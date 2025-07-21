import { Request, Response } from 'express';
import FirstService from '@services/firstService';
import { ResponseTO } from '@helpers/interfaces/response';
import Utilities from '@utils/utilities';

export const firstController = async (req: Request, res: Response) => {
  const account: ResponseTO = await new FirstService().firstAPI( req );
  Utilities.loggingReqAndResp(req, res, account);
}
