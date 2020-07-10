import * as Joi from '@hapi/joi';
import { custom } from '@hapi/joi';

export const createUserValidation = Joi.object({
  name: Joi.string()
    .required()
    .min(4)
    .max(20)
    .messages({
      'any.required': 'Campo obrigatório',
      'string.empty': 'Campo obrigatório',
      'string.min': 'Mínimo de 4 caracteres',
      'string.max': 'Máximo de 20 caracteres',
    }),
  surname: Joi.string()
    .required()
    .min(4)
    .max(50)
    .messages({
      'any.required': 'Campo obrigatório',
      'string.empty': 'Campo obrigatório',
      'string.min': 'Mínimo de 4 caracteres',
      'string.max': 'Máximo de 50 caracteres',
    }),
  email: Joi.string()
    .required()
    .email()
    .max(100)
    .messages({
      'any.required': 'Campo obrigatório',
      'string.empty': 'Campo obrigatório',
      'string.min': 'Mínimo de 4 caracteres',
      'string.email': 'Email inválido',
      'string.max': 'Máximo de 100 caracteres',
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(16)
    .messages({
      'any.required': 'Campo obrigatório',
      'string.empty': 'Campo obrigatório',
      'string.min': 'Mínimo de 8 caracteres',
      'string.max': 'Máximo de 16 caracteres',
    }),
  confirm_password: Joi.ref('password'),
}).with('password', 'confirm_password');

