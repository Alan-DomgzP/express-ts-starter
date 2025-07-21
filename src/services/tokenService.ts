import Utilities from '@utils/utilities';
import { ResponseTO } from '@helpers/interfaces/response';
import config from '@config';
import { responseMessages } from '@helpers/responseMessages';

import qs from 'qs';
import axios from 'axios';
import logger from '@loaders/logger';


export default class TokenService {
  constructor() {}

  public async makeAuthorizedRequest(): Promise<ResponseTO> {
    
    try {
      const folio = Utilities.referenceID();
      const endpoint_path = `${config.BASE_URL}${config.paths.token.endpoint}`;

      const token = await Utilities.postRequest({
        url: endpoint_path,
        data: qs.stringify({ grant_type: 'client_credentials' }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: config.USERNAME!,
          password: config.PASSWORD!,
        },
        rejectUnauthorized: false, // solo si es necesario
      });

      logger.info(endpoint_path, { folio });
      
      return Utilities.formatResponse(responseMessages.SUCCESSFUL, {
        token: token?.data.access_token,
        expires_in: token?.data.expires_in
      }, 
      folio);
      
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