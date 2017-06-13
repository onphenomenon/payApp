import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CreditCard {
  _id?: string;
  firstName: string;
  lastName: string;
  cardType: string;
  cardNumber: string;
  expiration: string;
  csc: string;
}

export const CardTypes = [
  { value: 0, viewValue: 'Master Card' },
  { value: 1, viewValue: 'Visa' },
  { value: 2, viewValue: 'Discover' },
  { value: 3, viewValue: 'American Express' },
];

export function creditNumberValidator(numberRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const number = control.value;
    const no = numberRe.test(number);
    return no ? null : { 'invalidNumber': { number } };
  };
}
