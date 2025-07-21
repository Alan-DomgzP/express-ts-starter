import { responseMessages } from '@helpers/responseMessages';
import logger from '@loaders/logger';
import Utilities from '@utils/utilities';
import { Request, Response, NextFunction } from 'express';
import SecurityService from '../../services/securityService';

let cachedKeys: any = null;
let keysPromise: Promise<any> | null = null;
let keysTimestamp: number | null = null;
const KEYS_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

const getkeys = async ( req: Request, res: Response, next: NextFunction ) => {
  const now = Date.now();

  if ( !cachedKeys || !keysTimestamp || now - keysTimestamp >= KEYS_EXPIRATION_MS ) {
    try {
      if ( !keysPromise ) {
        keysPromise = obtainKeys(req);
      }
      cachedKeys = await keysPromise;
      keysPromise = null;
      keysTimestamp = now;
      
    } catch ( error ) {
      keysPromise = null;
      
      Utilities.loggingReqAndResp(req, res, {
        ...responseMessages.KEYS_ERROR,
        folio: Utilities.referenceID()
      });
      return;
    }
  } else {
    logger.notice('Validación de llaves exitosa: Las llaves aún son válidas');
  }

  (req as any).keys = cachedKeys.resultado;
  next();
};

const obtainKeys = async( req: Request ) => {

  logger.notice(`Generando llaves asimétricas...`);
  const keys = await new SecurityService().getAsymmetricKeys( req );

  cachedKeys = keys.resultado;
  logger.notice(`Se han generado las llaves`);

  return keys;
}

export default getkeys;