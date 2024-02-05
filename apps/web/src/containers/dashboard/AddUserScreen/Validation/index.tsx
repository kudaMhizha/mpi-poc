import {inputValidations} from '@/web/constants/validations';
import {z} from 'zod';

export const addUserDefaultValues = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  jobDescription: '',
  accessLevel: '1',
};

export type AddUserFormValues = typeof addUserDefaultValues;

export const addUserSchema = z.object({
  name: z
    .string()
    .min(1, inputValidations.requiredField)
    .max(50, inputValidations.inputTooLong),
  surname: z
    .string()
    .min(1, inputValidations.requiredField)
    .max(50, inputValidations.inputTooLong),
  email: z
    .string()
    .email(inputValidations.invalidEmail)
    .max(50, inputValidations.inputTooLong),
  phone: z
    .string()
    .min(9, inputValidations.invalidPhoneNumber)
    .max(10, inputValidations.invalidPhoneNumber),
  jobDescription: z
    .string()
    .min(1, inputValidations.requiredField)
    .max(50, inputValidations.inputTooLong),
  accessLevel: z.string(),
});
