import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'yup';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async transform(value: any, metadata: ArgumentMetadata) {
    let isValid = true;
    const error = await this.schema
      .validate(value, {
        abortEarly: false,
      })
      .catch(e => {
        isValid = false;
        return e;
      });
    if (!isValid) {
      const array = error.inner.map(err => ({
        message: err.errors[0],
        label: err.path,
        type: err.type,
      }));
      throw new BadRequestException(array);
    }
    return value;
  }
}
