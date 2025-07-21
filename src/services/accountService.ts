import Utilities from '@utils/utilities';
import { ResponseTO } from '@helpers/interfaces/response';
// import config from '@config';
import { responseMessages } from '@helpers/responseMessages';

// import qs from 'qs';
import axios from 'axios';
import { Request } from 'express';
// import Validations from '@utils/validations';


export default class AccountService {
  constructor() {}

  public async accountOpening( req: Request ): Promise<ResponseTO> {
    
    try {
      // const validations = await Validations.validateRequest( Validations.accountOpeningJoiValidation, req.body );
      // if ( validations ) {
      //   return validations;
      // }
      const {  accesoPublico } = (req as any).keys;
      const folio_servicio = Utilities.referenceID();
      const { folio } = req.body;

      // const token = await Utilities.postRequest({
      //   url: `${config.BASE_URL}${config.paths.token.endpoint}`,
      //   data: qs.stringify({ grant_type: 'client_credentials' }),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   auth: {
      //     username: config.USERNAME!,
      //     password: config.PASSWORD!,
      //   },
      //   rejectUnauthorized: false, // solo si es necesario
      // });
      
      // return Utilities.formatResponse(responseMessages.SUCCESSFUL, {
      //   token: token?.data.access_token,
      //   expires_in: token?.data.expires_in
      // });
      const cifrado = Utilities.encryptWithPublicKey(accesoPublico, folio);

      // Utilities.formatResponse(responseMessages.SUCCESSFUL, { ...keys?.data.resultado }, folio);
      // logger.info(endpoint_path, { folio });

      return Utilities.formatResponse(responseMessages.SUCCESSFUL, {
        original: folio,
        cifrado: cifrado
      }, folio_servicio);
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