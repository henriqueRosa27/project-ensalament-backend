import * as Yup from 'yup';
import { validate } from 'uuid';

export const generateEnsalamentValidation = Yup.object({
  roomsIds: Yup.array().of(
    Yup.string().test('valid_id', 'Valor inválido', value => validate(value)),
  ),

  teamsIds: Yup.array().of(
    Yup.string().test('valid_id', 'Valor inválido', value => validate(value)),
  ),
});

export const createEnsalamentValidation = Yup.object({
  week: Yup.number()
    .required('Campo obrigatório')
    .oneOf([0, 1, 2, 3, 4, 5, 6], 'Valor inválido'),

  shift: Yup.number()
    .required('Campo obrigatório')
    .oneOf([0, 1, 2], 'Valor inválido'),

  rooms: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string()
          .required('Campo obrigatório')
          .test('valid_id', 'Valor inválido', value => validate(value)),
        teams: Yup.array()
          .required('Campo obrigatório')
          .of(
            Yup.string().test('valid_id', 'Valor inválido', value =>
              validate(value),
            ),
          ),
      }),
    )
    .required('Campo obrigatório'),
});
