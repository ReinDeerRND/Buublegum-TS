import { PhotoType, UserType } from '../models/users.model';

export enum ResponseTypes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type ResponseType<T extends object = {}> = {
    data: T,
    resultCode: number;
    messages: Array<number>,
}

export type MeResponseType = ResponseType<{
    id: number;
    login: string;
    email: string;
}>
export type LoginResponseType = ResponseType<{ id: number }>
export type GetCaptchaResponseType = {
    url: string;
}
export type GetUsersResponseType = {
    items: Array<UserType>;
    totalCount: number;
    error: string | null;
}
export type UploadPhotoResponseType = ResponseType<{ photos: PhotoType }>