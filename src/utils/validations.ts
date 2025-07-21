import Joi from 'joi';
import { Schema } from 'joi';
import Utilities from '@utils/utilities';
import { responseMessages } from '@helpers/responseMessages';

class Validations {

  //? JOI VALIDATION FORM
  static validateRequest = async (schema: Schema, data: any) => {
    const { error } = await schema.validate(data);
    if (error) {
      return Utilities.formatResponse({
        ...responseMessages.VALIDATION_ERROR,
        mensaje: error.details[0].message,
      });
    }
    return false;
  };

  static accountOpeningJoiValidation = Joi.object({
    // privateKey: Joi.string().empty('').required().messages({
    //   'any.required': 'La llave privada es requerida'
    // }),
    publicKey: Joi.string().empty('').required().messages({
      'any.required': 'La llave pública es requerida'
    }),
    folio: Joi.string().empty('').required().messages({
      'any.required': 'El folio es requerido'
    })
    // TODO: Agregar los siguientes valores en la validación de Joi
    //     "numeroClienteCore": "",
    // "numeroRECA": "",
    // "idPais": "",
    // "idCanal": "",
    // "idSucursal": "",
  });


}

export default Validations;
