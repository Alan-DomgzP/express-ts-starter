import Utilities from '@utils/utilities';
import { ResponseTO } from '@helpers/interfaces/response';
import { responseMessages } from '@helpers/responseMessages';
import { Request } from 'express';
import config from '@config';
import axios from 'axios';
import logger from '@loaders/logger';
// import qs from 'qs';


export default class SecurityService {
  constructor() {}

  public async getAsymmetricKeys( req: Request ): Promise<ResponseTO> {

    try { 
      const token = (req as any).token;
      const bearer_token = { Authorization: `Bearer ${token}` }
      const folio = Utilities.referenceID();
      const endpoint_path = `${config.BASE_URL}${config.paths.security_key.endpoint}`;

      const keys = await Utilities.getRequest({
        url: endpoint_path,
        headers: bearer_token,
        rejectUnauthorized: false
      });

      const publicKey = JSON.stringify(keys?.data?.resultado?.accesoPublico);

      logger.info(endpoint_path, { folio });
      logger.notice(`Llave pública generada: ${publicKey.slice(0,25) }..."`, { folio });

      return Utilities.formatResponse(responseMessages.SUCCESSFUL, { ...keys?.data.resultado }, folio);
    }
    catch( error ) {
      
      if (axios.isAxiosError(error)) {
        return Utilities.formatResponse({
          ...responseMessages.ERROR_OCURRED,
          mensaje: error.response?.data?.mensaje || 'Error desconocido',
          status: error.response?.status || 500,
          detalles: error.response?.data?.detalles
        });
      }

      return Utilities.errorHandlerResponse(error as Error);
    }
  }

}