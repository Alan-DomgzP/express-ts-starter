import Utilities from '@utils/utilities';
import { ResponseTO } from '@helpers/interfaces/response';
// import config from '@config';
import { responseMessages } from '@helpers/responseMessages';

// import qs from 'qs';
import axios from 'axios';
import { Request } from 'express';
// import Validations from '@utils/validations';


export default class FirstService {
  constructor() {}

  public async firstAPI( req: Request ): Promise<ResponseTO> {
    
    try {
      return Utilities.formatResponse(responseMessages.SUCCESSFUL);
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
      console.log(error)
      return Utilities.errorHandlerResponse(error as Error);
    }
  }

}