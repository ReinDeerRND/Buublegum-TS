import { reduxForm } from 'redux-form';
import classes from './Login.module.css';
import { createControl, InputControl } from '../common/FormControls/FormControls';
import { requiredField } from '../../utils/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/reducers/authReducer';
import { Redirect } from 'react-router-dom';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createControl(InputControl, "login", "Login", [requiredField],  {autoFocus: true})}
            {createControl(InputControl, "password", "Password", [requiredField], { type: "password"})}
            {createControl(InputControl, "isRemember", null, [], { type: "checkbox"}, "Remember me")}

            {captchaUrl && <img src = {captchaUrl} alt="Captcha"/>}
            {captchaUrl && createControl(InputControl, "captcha", "Enter figures from picture", [requiredField])}
            <div className={classes.common_error}>{error}</div>
            <div className={classes.field}>
                <button type="submit">Log In</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.isRemember, formData.captcha)
    }
    if (props.isLogged) {
        return <Redirect to="/profile" />
    }
    return (
        <div className={classes.container}>
            <h1>Login page</h1>
            <LoginReduxForm onSubmit={onSubmit}  captchaUrl={props.captchaUrl}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged,
        captchaUrl: state.auth.captchaUrl
    }

}
export default connect(mapStateToProps, { login, logout })(Login);