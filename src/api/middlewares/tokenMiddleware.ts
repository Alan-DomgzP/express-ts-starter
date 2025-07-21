import TokenService from '@services/tokenService';
import { Request, Response, NextFunction } from 'express';
import Utilities from '@utils/utilities';
import { responseMessages } from '@helpers/responseMessages';
import logger from '@loaders/logger';

let cachedToken: string | null = null;
let tokenExpiration: number | null = null;
let tokenPromise: Promise<string | null> | null = null;

const DEFAULT_EXPIRES_IN_SECONDS = 3600;

const validateToken = async ( req: Request, res: Response, next: NextFunction ) => {
  const now = Date.now();
 
  if ( !cachedToken || !tokenExpiration || now >= tokenExpiration ) {
    try {
      if ( !tokenPromise ) {
        tokenPromise = getToken(now);
      }
      
      const token = await tokenPromise;
      tokenPromise = null;

      if ( !token ) {
        Utilities.loggingReqAndResp(req, res, {
          ...responseMessages.JWT_ERROR,
          folio: Utilities.referenceID()
        });
        return;
      }

    }
    catch ( error ) {
      tokenPromise = null;
      Utilities.loggingReqAndResp(req, res, {
        ...responseMessages.EXPIRED_JWT,
        folio: Utilities.referenceID()
      });
      return;
    }
  } else {
    logger.notice('Validación de token exitosa: el token aún es válido');
  }
  
  (req as any).token = cachedToken;
  next();
};

const getToken = async( now: number ) => {
  const response = await new TokenService().makeAuthorizedRequest();
  const token = response.resultado?.token;
  const expiresInStr = response.resultado?.expires_in;

  const expiresIn = parseInt( expiresInStr ?? DEFAULT_EXPIRES_IN_SECONDS, 10 );

  cachedToken = token;
  tokenExpiration = now + expiresIn * 1000;

  logger.notice(`Nuevo token obtenido. Expira en ${ expiresIn } segundos`, { folio: response.folio });

  return token;
}

export default validateToken;
