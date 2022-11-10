import axios from "axios";
import { ProfileType } from "../redux/models/profile.model";
import { GetCaptchaResponseType, GetUsersResponseType, LoginResponseType, MeResponseType, ResultResponseType, UploadPhotoResponseType } from "./api.model";

const axiosConfig = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: { "API-KEY": "5e9b0567-1d4c-4f0c-b3cd-9aba89e52c00" }
})


export const authAPI = {
    getAuth(): Promise<MeResponseType> {
        return axiosConfig.get<MeResponseType>("auth/me")
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null): Promise<LoginResponseType> {
        return axiosConfig.post<LoginResponseType>("auth/login", { email, password, rememberMe, captcha })
            .then(response => response.data);
    },
    logout(): Promise<ResultResponseType> {
        return axiosConfig.delete<ResultResponseType>("auth/login")
        .then(response => response.data);
    },
}

export const securityAPI = {
    getCaptcha(): Promise<GetCaptchaResponseType>{
        return axiosConfig.get<GetCaptchaResponseType>("security/get-captcha-url")
            .then(response => response.data);
    }
}

export const userAPI = {
    getUsers(page: number, pageSize: number): Promise<GetUsersResponseType> {
        return axiosConfig.get<GetUsersResponseType>(`users?page=${page}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(userId: number): Promise<ResultResponseType> {
        return axiosConfig.post<ResultResponseType>(`follow/${userId}`, {})
        .then(response => response.data);
    },
    unfollowUser(userId: number): Promise<ResultResponseType> {
        return axiosConfig.delete<ResultResponseType>(`follow/${userId}`)
        .then(response => response.data);
    },
}

export const profileAPI = {
    getProfile(userId: number): Promise<ProfileType> {
        return axiosConfig.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number): Promise<string> {
        return axiosConfig.get<string>(`/profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus(status: string): Promise<ResultResponseType> {
        return axiosConfig.put<ResultResponseType>(`/profile/status/`, { status: status })
            .then(response => response.data);
    },
    uploadPhoto(file: any): Promise<UploadPhotoResponseType> {
        const formData = new FormData();
        formData.append('image', file)
        return axiosConfig.put<UploadPhotoResponseType>(`/profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => response.data);
    },
    uploadProfile(profile: ProfileType): Promise<ResultResponseType> {
        return axiosConfig.put<ResultResponseType>(`/profile`, profile)
            .then(response => response.data);
    },
}