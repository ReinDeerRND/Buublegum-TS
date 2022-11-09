export const SET_AUTH_USER_DATA = "auth/SET_AUTH_USER_DATA";
export const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

export type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA;
    userData: {
        userId: number | null;
        email: string | null;
        login: string | null;
        isLogged: boolean;
    }
}
export type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL;
    captchaUrl: string;
}

export type AuthActionType = SetAuthUserDataActionType | SetCaptchaUrlActionType;