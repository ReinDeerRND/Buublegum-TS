import classes from './FormControls.module.css';
import { Field } from 'redux-form';
import cn from 'classnames';

export const TextareaControl = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={cn(classes.form_control, { [classes.error]: hasError })}>
            {/* <div className={classes.form_control + " " + (hasError ? classes.error : "")}></div> */}
            <textarea {...input} {...props} className={classes.textarea} />
            {hasError && <span> {meta.error}</span>}
        </div>
    )
}

export const InputControl = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={cn(classes.form_control, { [classes.error]: hasError })}>
            <input {...input} {...props} />
            {hasError && <span> {meta.error}</span>}
        </div>
    )
}

export const createControl = (componentType, name, placeholder, validators, props, text = "") => {
    return (
        <div className={cn(classes.field, {[classes.checkbox]: props?.type === "checkbox"})} key={name}>
            <Field component={componentType} name={name} placeholder={placeholder} validate={validators}  {...props} />
            <span className={classes.field_span}>{text}</span>
        </div>
    )
}