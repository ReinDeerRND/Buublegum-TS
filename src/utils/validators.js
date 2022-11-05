/** Validators for inputs-forms */

export const requiredField = (value) => {
    return value ? undefined : "Field value is requiered";
}

export const maxLength = (number) => (value) => {
    return value?.length < number ? undefined : `Amount of symbols must be less ${number}`;
}