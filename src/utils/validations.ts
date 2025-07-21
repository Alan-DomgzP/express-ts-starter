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

  static authJoiValidation = Joi.object({
    username: Joi.string().empty('').pattern(/^\d{4,10}$/).required().messages({
      'any.required': 'Username is required',
      'string.pattern.base': 'Usernames is only digits'
    }),
    password: Joi.string().empty('').required().messages({
      'any.required': 'Password is required'
    })
  });


}

export default Validations;
