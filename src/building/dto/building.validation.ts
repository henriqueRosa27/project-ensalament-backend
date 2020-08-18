import * as Yup from 'yup';

export const buildingValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
});
