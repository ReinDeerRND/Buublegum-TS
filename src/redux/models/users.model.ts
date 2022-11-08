import { PhotoType } from "./api.model";

export type UserType = {
    followed: boolean; 
    id: number;
    name: string;
    photos: PhotoType
    status: string | null;
    uniqueUrlName: string | null;
}

export const FOLLOW = "users/FOLLOW";
export const UNFOLLOW = "users/UNFOLLOW";
export const SET_USERS = "users/SET_USERS";
export const SET_TOTAL_COUNT = "users/SET_TOTAL_COUNT";
export const SET_SELECTED_PAGE = "users/SET_SELECTED_PAGE";
export const TOGGLE_LOADING = "users/TOGGLE_LOADING";
export const TOGGLE_FOLLOW = "users/TOGGLE_FOLLOW";

export type UsersStateType = {
    users: UserType[];
    totalCount: number;
    pageSize: number;
    selectedPage: number;
    isLoading: boolean;
    followUsersInProcess: number[]
}

export type SetFollowType = {
    type: typeof FOLLOW, 
    userId: number;
}
export type SetUnollowType = {
    type: typeof UNFOLLOW, 
    userId: number;
}
export type SetUsersType = {
    type: typeof SET_USERS, 
    users: UserType[];
}
export type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT, 
    count: number;
}
export type SetSelectedPageType = {
    type: typeof SET_SELECTED_PAGE, 
    pageNumber: number;
}
export type ToggleLoadingType = {
    type: typeof TOGGLE_LOADING, 
    isLoading: boolean;
}
export type ToggleFollowingType = {
    type: typeof TOGGLE_FOLLOW, 
    isLoading: boolean;
    userId: number;
}