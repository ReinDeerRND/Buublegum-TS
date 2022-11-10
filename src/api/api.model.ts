import { PhotoType, UserType } from '../models/users.model';

export enum ResponseTypes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type MeResponseType = {
    data: {
        id: number;
        login: string;
        email: string;
    },
    resultCode: number;
    messages: Array<string>;
}
export type LoginResponseType = {
    data: {
        id: number;
    },
    resultCode: number;
    messages: Array<string>;
}
export type ResultResponseType = {
    data: {},
    resultCode: number;
    messages: Array<number>,
}
export type GetCaptchaResponseType = {
    url: string;
}
export type GetUsersResponseType = {
    items: Array<UserType>;
    totalCount: number;
    error: string | null;
}
export type UploadPhotoResponseType = {
    data: { 
        photos: PhotoType; 
    };
    resultCode: number;
    messages: Array<string>;
}