import { profileAPI } from "../../api/profile-api";
import { FormAction, stopSubmit } from "redux-form";
import {
    PostType,
    ProfileType,
} from '../../models/profile.model';
import { PhotoType } from "../../models/users.model";
import { ResponseTypes } from "../../api/api.model";
import { ActionsType, AppStateType, ThunkType } from "../store";
import { Dispatch } from "react";

export type ProfileStateType = {
    profile: ProfileType | null;
    status: string;
    posts: Array<PostType>,
}

let initState: ProfileStateType = {
    profile: null,
    status: "",
    posts: [
        { id: 0, text: "Post 1 About ocean", likesCount: 3 },
        { id: 1, text: "Post 2 About Sun", likesCount: 42 }
    ],
};

const profileReducer = (state = initState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case "profile/ADD-POST":
            let post = {
                id: state.posts.length,
                text: action.newPost,
                likesCount: 0
            };

            return {
                ...state,
                posts: [post, ...state.posts],

            };
        case "profile/DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case "profile/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "profile/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "profile/UPLOAD_PHOTO_SUCCESS":
            return {
                ...state,
                profile: {
                    ...(state.profile ? state.profile : {}),
                    photos: action.photos
                }
            }
        case 'profile/SET_ERROR_PROFILE':
            return {
                ...state,
                profile: { userId: null },
                status: "This profile doesn't exist"
            }
        default:
            return state;
    }
}
export const profileActions = {
    addPostActionCreator: (newPost: string) => ({ type: 'profile/ADD-POST', newPost } as const),
    deletePostCreator: (postId: number | null) => ({ type: 'profile/DELETE_POST', postId } as const), //for TDD
    setUserProfile: (profile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
    updatePhoto: (photos: PhotoType) => ({ type: 'profile/UPLOAD_PHOTO_SUCCESS', photos } as const),
    setErrorProfile: () => ({ type: 'profile/SET_ERROR_PROFILE' } as const),
}
type ProfileActionsType = ActionsType<typeof profileActions>;

type ProfileThunkType = ThunkType<ProfileStateType, ProfileActionsType>

export const getProfileThunkCreator = (userId: number): ProfileThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    if (data?.userId) {
        dispatch(profileActions.setUserProfile(data));
    } else {
        console.error(`This user ID ${userId} does't exist!`);
        dispatch(profileActions.setErrorProfile());
    }
}

export const getStatusThunkCreator = (userId: number): ProfileThunkType => async (dispatch) => {
    let status = await profileAPI.getStatus(userId);
    if (status) {
        dispatch(profileActions.setStatus(status));
    }
}

export const updateStatusThunkCreator = (status: string): ProfileThunkType => async (dispatch) => {
    let result = await profileAPI.updateStatus(status);
    if (result.resultCode === ResponseTypes.Success) {
        dispatch(profileActions.setStatus(status));
    }
}

export const uploadPhoto = (file: File): ProfileThunkType => async (dispatch) => {
    let response = await profileAPI.uploadPhoto(file);
    if (response.resultCode === 0) {
        dispatch(profileActions.updatePhoto(response.data.photos));
    }
}

type CombinedThunkType = ThunkType<AppStateType, (ProfileActionsType | FormAction)>;

export const uploadProfileData = (formData: ProfileType): CombinedThunkType => async (dispatch: Dispatch<any>, getState) => {
    const userId = getState().auth.userId;
    if (userId === null) return;
    let response = await profileAPI.uploadProfile(formData);
    if (response.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("profileData", { _error: response.messages[0] }))
    }
}


export default profileReducer;