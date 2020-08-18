import { classToPlain, plainToClass } from 'class-transformer';

export class Mapper {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  map<
    T extends {
      new (...args: any[]): InstanceType<T>;
    }
  >(classRef: T, data: any): any {
    const obj = classToPlain(data);

    return plainToClass(classRef, obj);
  }
}
