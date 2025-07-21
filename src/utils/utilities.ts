import os from 'os';
import { Request, Response } from 'express'
import https from 'https';
import axios, { AxiosRequestConfig } from 'axios';
import { publicEncrypt, privateDecrypt, constants } from 'crypto';

import logger from '@loaders/logger'
import { ExtendedMessageObject, Resultado, ResponseTO } from '@helpers/interfaces/response'
import { responseMessages } from '@helpers/responseMessages';
import { PostRequestOptions } from '@helpers/interfaces/postRequest';
import { GetRequestOptions } from '@helpers/interfaces/getRequest';

class Utilities {

  //? FORMAT RESPONSE FOR API'S
  static formatResponse = (messageObject: ExtendedMessageObject, resultado?: Resultado, folio?: string): ResponseTO => {
    return {
      ...messageObject,
      folio: folio ?? this.referenceID(),
      resultado
    };
  };

  static loggingReqAndResp = (req: Request, res: Response, data: ResponseTO) => {
    const folio = data.folio;

    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      logger.info(` ${ JSON.stringify(req.body) } `, { folio });
    }
    
    if ( data.status >= 200 && data.status < 300 ) {
      logger.info( `${ JSON.stringify( data ) }`, { folio } );
    } else if ( data.status >= 300 && data.status < 400 ) {
      logger.warn( `${ JSON.stringify( data ) } `, { folio });
    } else if ( data.status >= 400 && data.status < 500 ) {
      logger.error(`Client error: ${ JSON.stringify(data ) }`, { folio });
    } else if ( data.status >= 500 ) {
      logger.error(`Server error: ${ JSON.stringify( data ) }`, { folio });
    } else {
      logger.info(`${ JSON.stringify( data ) }`, { folio }); // Default to info for other status codes
    }
    return res.status(data.status).json(data);
  }

  //? ERROR HANDLER RESPONSE
  static errorHandlerResponse = ( error: Error ): ResponseTO => {
    logger.error('Ocurrió un error: ', error);
    return this.formatResponse(responseMessages.ERROR_OCURRED);
  }

  //? REFERENCE NUMBER ID GENERATION
  static referenceID = (): string => {
    try {
      const localIP = this.getLocalIP();
      const octet = localIP.split('.')[3];
      const now = new Date();
      const format = this.formatDate(now);
      let folio = octet + format;
  
      folio = this.padFolio(folio, 20);
  
      return folio;
    } catch (error) {
      console.error("A problem occur with localhost: ", error);
      return "";
    }
  }
  
  static getLocalIP = (): string => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]!) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    throw new Error('Cannot get the local IP');
  }
  
  static formatDate = (date: Date): string => {
    return `${date.getFullYear()}${this.pad(date.getMonth() + 1)}${this.pad(date.getDate())}${this.pad(date.getHours())}${this.pad(date.getMinutes())}${this.pad(date.getSeconds())}${date.getMilliseconds()}`;
  }
  
  static pad = (number: number): string => {
    return number < 10 ? '0' + number : number.toString();
  }
  
  static padFolio = (folio: string, length: number): string => {
    if (folio.length < length) {
      const padding = length - folio.length;
      for (let i = 0; i < padding; i++) {
        folio += Math.floor(Math.random() * 10);
      }
    }
    return folio;
  }


  static postRequest = async (options: PostRequestOptions) => {
    const {
      url,
      data,
      headers = {},
      auth,
      rejectUnauthorized = true,
    } = options;

    const httpsAgent = new https.Agent({ rejectUnauthorized });

    const config: AxiosRequestConfig = {
      headers,
      auth,
      httpsAgent,
    };

    return axios.post(url, data, config);
  }

  static getRequest = async (options: GetRequestOptions) => {
    const {
      url,
      headers = {},
      auth,
      rejectUnauthorized = true,
    } = options;

    const httpsAgent = new https.Agent({ rejectUnauthorized });

    const config: AxiosRequestConfig = {
      headers,
      auth,
      httpsAgent,
    };

    return axios.get(url, config);
  }


  static encryptWithPublicKey = (rawPublicKey: string, data: string): string  => {
    const publicKey = Utilities.toPem(rawPublicKey, 'public');
    const buffer = Buffer.from(data, 'utf8');

    const encrypted = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      buffer
    );

    return encrypted.toString('base64');
  }
  
  static decryptWithPrivateKey = (rawPrivateKey: string, encryptedBase64: string): string  => {
    const privateKey = Utilities.toPem(rawPrivateKey, 'private');
    const buffer = Buffer.from(encryptedBase64, 'base64');

    const decrypted = privateDecrypt(
      {
        key: privateKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      buffer
    );

    return decrypted.toString('utf8');
  }

  static toPem = (key: string, type: 'public' | 'private'): string => {
    // Elimina espacios o saltos de línea existentes
    const cleanedKey = key.replace(/\s+/g, '');

    // Encabezados específicos para PKCS#8 (formato que usa tu API)
    const header = type === 'public' 
      ? '-----BEGIN PUBLIC KEY-----' 
      : '-----BEGIN PRIVATE KEY-----'; // PKCS#8 (no usa "RSA PRIVATE KEY")

    const footer = type === 'public' 
      ? '-----END PUBLIC KEY-----' 
      : '-----END PRIVATE KEY-----';

    // Divide en líneas de 64 caracteres
    const body = cleanedKey.match(/.{1,64}/g)?.join('\n') || '';

    return `${header}\n${body}\n${footer}`;
  };


  static sanitizeString(str: string): string {
    return str.trim().replace(/[^\w\s.-áéíóúÁÉÍÓÚñÑ]/, '');
  };

}

export default Utilities;
