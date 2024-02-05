import {inputValidations} from '@/web/constants/validations';
import {z} from 'zod';

export const addCompanyDefaultValues = {
  companyName: '',
  address: '',
  contactPerson: '',
  contactPersonEmail: '',
  contactPersonPhone: '',
};

export type AddCompanyFormValues = typeof addCompanyDefaultValues;

export const addCompanySchema = z.object({
  companyName: z.string().min(1, inputValidations.requiredField),
  address: z.string().min(1, inputValidations.requiredField),
  contactPerson: z.string().min(1, inputValidations.requiredField),
  contactPersonEmail: z
    .string()
    .email(inputValidations.invalidEmail)
    .min(1, inputValidations.requiredField),
  contactPersonPhone: z
    .string()
    .min(9, inputValidations.invalidPhoneNumber)
    .max(10, inputValidations.invalidPhoneNumber),
  secondaryContactPerson: z.optional(z.string()),
  secondaryContactPersonEmail: z.optional(z.string().email()),
  secondaryContactPersonPhone: z.optional(
    z
      .string()
      .min(9, inputValidations.invalidPhoneNumber)
      .max(10, inputValidations.invalidPhoneNumber)
  ),
});
