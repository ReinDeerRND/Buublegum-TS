import { InjectedFormProps, reduxForm } from 'redux-form';
import classes from './Login.module.css';
import { createControl, InputControl } from '../common/FormControls/FormControls';
import { requiredField } from '../../utils/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/reducers/authReducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/store';

type LoginFormDataType = {
    login: string;
    password: string;
    isRemember: boolean;
    captcha: string | null;
}
type LoginOwnPropsType = {
    captchaUrl: string | null;
}
const LoginForm: React.FC<LoginOwnPropsType & InjectedFormProps<LoginFormDataType, LoginOwnPropsType, string>> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createControl(InputControl, "login", "Login", [requiredField], { autoFocus: true })}
            {createControl(InputControl, "password", "Password", [requiredField], { type: "password" })}
            {createControl(InputControl, "isRemember", null, [], { type: "checkbox" }, "Remember me")}

            {captchaUrl && <img src={captchaUrl} alt="Captcha" />}
            {captchaUrl && createControl(InputControl, "captcha", "Enter figures from picture", [requiredField], {})}
            <div className={classes.common_error}>{error}</div>
            <div className={classes.field}>
                <button type="submit">Log In</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginOwnPropsType>({
    form: 'login'
})(LoginForm)

type LoginProps = {
    isLogged: boolean;
    captchaUrl: string | null;
    logout: ()=> void; 
    login: (login: string, password: string, isRemember: boolean, captcha?: string | null) => void;
    
}

const Login: React.FC<LoginProps> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.login, formData.password, formData.isRemember, formData.captcha)
    }
    if (props.isLogged) {
        return <Redirect to="/profile" />
    }
    return (
        <div className={classes.container}>
            <h1>Login page</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}
type MapStateToPropsType = {
    isLogged: boolean;
    captchaUrl: string | null;
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
    logout: ()=> void;
}
let mapStateToProps = (state: AppStateType) : MapStateToPropsType => {
    return {
        isLogged: state.auth.isLogged,
        captchaUrl: state.auth.captchaUrl
    }

}
export default connect<MapStateToPropsType, MapDispatchToProps, LoginOwnPropsType, AppStateType>(mapStateToProps, { login, logout })(Login);