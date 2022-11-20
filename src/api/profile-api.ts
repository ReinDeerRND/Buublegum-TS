import { ProfileType } from "../models/profile.model";
import { axiosConfig } from "./api";
import { ResponseType, UploadPhotoResponseType } from "./api.model";

export const profileAPI = {
    getProfile(userId: number): Promise<ProfileType> {
        return axiosConfig.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data, reject => reject);
    },
    getStatus(userId: number): Promise<string> {
        return axiosConfig.get<string>(`/profile/status/${userId}`)
            .then(response => response.data, reject => reject);
    },
    updateStatus(status: string): Promise<ResponseType> {
        return axiosConfig.put<ResponseType>(`/profile/status/`, { status: status })
            .then(response => response.data);
    },
    uploadPhoto(file: File): Promise<UploadPhotoResponseType> {
        const formData = new FormData();
        formData.append('image', file)
        return axiosConfig.put<UploadPhotoResponseType>(`/profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => response.data);
    },
    uploadProfile(profile: ProfileType): Promise<ResponseType> {
        return axiosConfig.put<ResponseType>(`/profile`, profile)
            .then(response => response.data);
    },
}