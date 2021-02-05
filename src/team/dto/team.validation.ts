import { CourseEntity } from './../../course/course.entity';
import { CourseService } from 'src/course/course.service';
import { Repository } from 'typeorm';
import * as Yup from 'yup';
import { validate } from 'uuid';

export const teamValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  number_students: Yup.number()
    .required('Campo obrigatório')
    .min(0, 'Valor mínimo de 0'),
  course_id: Yup.string()
    .required('Campo obrigatório')
    .test('validate-param', 'Valor inválido', value =>
      validate(String(value)),
    )
    .test('building_exists', 'Curso não existe', async value => {
      if (value) {
        const courseService = new CourseService(new Repository<CourseEntity>());

        const course = await courseService.findByIdActive(value);
        return !!course;
      }
      return true;
    }),
});
