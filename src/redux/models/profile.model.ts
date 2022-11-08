import { PhotoType } from "./api.model";

export type ProfileStateType = {
    profile: ProfileType | null;
    status: string;
    posts: Array<PostType>,
}
export type PostType = {
    id: number;
    text: string;
    likesCount: number;
}
export type ProfileType = {
    aboutMe?: string | null;
    contacts?: { [social in string]: string | null };
    fullName?: string;
    lookingForAJob?: boolean;
    lookingForAJobDescription?: string;
    photos: PhotoType;
    userId?: number | null;
}

export const ADD_POST = "profile/ADD-POST";
export const DELETE_POST = "profile/DELETE_POST";
export const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
export const SET_STATUS = "profile/SET_STATUS";
export const UPLOAD_PHOTO_SUCCESS = "profile/UPLOAD_PHOTO_SUCCESS";

export type AddPostActionType = {
    type: typeof ADD_POST;
    newPost: string;
}
export type DeletePostActionType = {
    type: typeof DELETE_POST;
    postId: number | null;
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile: ProfileType;
}
export type SetStatusActionType = {
    type: typeof SET_STATUS;
    status: string;
}
export type UpdatePhotoActionType = {
    type: typeof UPLOAD_PHOTO_SUCCESS;
    photos: PhotoType;
}
