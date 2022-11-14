import { axiosConfig } from "./api";
import { GetCaptchaResponseType } from "./api.model";

export const securityAPI = {
    getCaptcha(): Promise<GetCaptchaResponseType>{
        return axiosConfig.get<GetCaptchaResponseType>("security/get-captcha-url")
            .then(response => response.data);
    }
}