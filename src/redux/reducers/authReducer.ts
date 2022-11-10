import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, securityAPI } from "../../api/api";
import { ResponseTypes } from "../../api/api.model";
import { AuthActionType, SetAuthUserDataActionType, SetCaptchaUrlActionType, SET_AUTH_USER_DATA, SET_CAPTCHA_URL } from "../models/auth.model";



export type AuthStateType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isLogged: boolean;
    captchaUrl: string | null;
}

let initState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isLogged: false,
    captchaUrl: null,
};

const authReducer = (state = initState, action: AuthActionType): AuthStateType => {
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

export const setAuthUserData = (
    userId: number | null,
    email: string | null,
    login: string | null,
    isLogged: boolean
): SetAuthUserDataActionType => ({ type: SET_AUTH_USER_DATA, userData: { userId, email, login, isLogged } });
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({ type: SET_CAPTCHA_URL, captchaUrl });

type ThunkType = ThunkAction<void, AuthStateType, unknown, AuthActionType>

export const getAuthThunkCreator = (): ThunkType => async (dispatch: any) => {
    //dispatch can return something, this example - it returns Promise
    let res = await authAPI.getAuth();
    if (res.resultCode === ResponseTypes.Success) {
        let { id, login, email } = res.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch: any) => {
    let res = await authAPI.login(email, password, rememberMe, captcha);
    if (res.resultCode === ResponseTypes.Success) {
        dispatch(getAuthThunkCreator());
    } else {
        if (res.resultCode === ResponseTypes.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = res.messages.length > 0 ? res.messages[0] : 'Any error occured';
        // action creator from redux-form, может показыавть конкретные поля формы {login: "Login error occured"}
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const logout = (): ThunkType => async (dispatch: any) => {
    let res = await authAPI.logout();
    if (res.resultCode === ResponseTypes.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha();
    dispatch(setCaptchaUrl(response.url));
}

export default authReducer;