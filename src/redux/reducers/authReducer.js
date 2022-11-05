import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../../api/api";

const SET_AUTH_USER_DATA = "auth/SET_AUTH_USER_DATA";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

let initState = {
    userId: null,
    email: null,
    login: null,
    isLogged: false,
    captchaUrl: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.userData,
            };
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isLogged) => ({ type: SET_AUTH_USER_DATA, userData: { userId, email, login, isLogged } });
export const setCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL, captchaUrl });

export const getAuthThunkCreator = () => async (dispatch) => {
    //dispatch can return something, this example - it returns Promise
    let res = await authAPI.getAuth();
    if (res.data.resultCode === 0) {
        let { id, login, email } = res.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let res = await authAPI.login(email, password, rememberMe, captcha);
    if (res.data.resultCode === 0) {
        dispatch(getAuthThunkCreator());
    } else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = res.data?.messages?.length > 0 ? res.data.messages[0] : 'Any error occured';
        // action creator from redux-form, может показыавть конкретные поля формы {login: "Login error occured"}
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const logout = () => async (dispatch) => {
    let res = await authAPI.logout();
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async(dispatch) => {
    const response = await securityAPI.getCaptcha();
    dispatch(setCaptchaUrl(response.url));
}

export default authReducer;