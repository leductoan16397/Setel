import { ValidationError } from 'class-validator';
import { ExceptionError } from './interface/exceptionError.interface';
import { BadRequestException } from '@nestjs/common';

export const ExceptionFactory2 = (errors: ValidationError[]) => {
  const mewErrors: ExceptionError[] = errors.map((error) => {
    return generateValidation(error);
  });
  throw new BadRequestException(mewErrors);
};

const generateValidation = (error: ValidationError): ExceptionError => {
  const err: ExceptionError = {
    key: error.property,
  };
  if (error.constraints) {
    err.message = Object.values(error.constraints);
  }
  if (error.children.length > 0) {
    err.children = error.children.map(generateValidation);
  }
  return err;
};
export const ExceptionFactory = (errors: ValidationError[]) => {
  const mewErrors: ExceptionError2 = {};
  errors.forEach((error) => {
    generateValidation2(error, mewErrors);
  });
  throw new BadRequestException({ message: mewErrors });
};
export interface ExceptionError2 {
  [key: string]: string[]
}
const generateValidation2 = (error: ValidationError, mewErrors: ExceptionError2, parent?: string) => {
  if (error.constraints) {
    mewErrors[parent ? `${parent}.${error.property}` : error.property] = Object.values(error.constraints);
  }
  if (error.children.length > 0) {
    error.children.forEach(item => generateValidation2(item, mewErrors, parent ? `${parent}.${error.property}` : error.property));
  }
};