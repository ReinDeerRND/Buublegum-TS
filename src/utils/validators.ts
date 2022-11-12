/** Validators for inputs-forms */

export type ValidatorFn = (value: string)=> string | undefined;

export const requiredField: ValidatorFn = (value)=> {
    return value ? undefined : "Field value is requiered";
}

export const maxLength = (number: number): ValidatorFn => (value: string) => {
    return value?.length < number ? undefined : `Amount of symbols must be less ${number}`;
}