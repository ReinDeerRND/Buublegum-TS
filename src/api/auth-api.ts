import { axiosConfig } from "./api";
import { LoginResponseType, MeResponseType, ResponseType } from "./api.model";

export const authAPI = {
    getAuth(): Promise<MeResponseType> {
        return axiosConfig.get<MeResponseType>("auth/me")
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null): Promise<LoginResponseType> {
        return axiosConfig.post<LoginResponseType>("auth/login", { email, password, rememberMe, captcha })
            .then(response => response.data);
    },
    logout(): Promise<ResponseType> {
        return axiosConfig.delete<ResponseType>("auth/login")
        .then(response => response.data);
    },
}