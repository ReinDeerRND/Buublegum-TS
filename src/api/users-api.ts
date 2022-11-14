import { axiosConfig } from "./api";
import { GetUsersResponseType, ResponseType } from "./api.model";

export const userAPI = {
    getUsers(page: number, pageSize: number): Promise<GetUsersResponseType> {
        return axiosConfig.get<GetUsersResponseType>(`users?page=${page}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(userId: number): Promise<ResponseType> {
        return axiosConfig.post<ResponseType>(`follow/${userId}`, {})
        .then(response => response.data);
    },
    unfollowUser(userId: number): Promise<ResponseType> {
        return axiosConfig.delete<ResponseType>(`follow/${userId}`)
        .then(response => response.data);
    },
}