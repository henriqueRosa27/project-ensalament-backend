import * as Yup from 'yup';

export const loginValidation = Yup.object({
  email: Yup.string()
    .required('Campo obrigatório')
    .email('Email inválido')
    .max(100, 'Tamanho máximo de 100 caracteres'),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'Mínimo de 8 caracteres')
    .max(16, 'Máximo de 16 caracteres'),
});
