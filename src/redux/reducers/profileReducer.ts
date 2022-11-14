import { profileAPI } from "../../api/profile-api";
import { stopSubmit } from "redux-form";
import {
    PostType,
    ProfileType,
} from '../../models/profile.model';
import { PhotoType } from "../../models/users.model";
import { ThunkAction } from "redux-thunk";
import { ResponseTypes } from "../../api/api.model";
import { ActionsType } from "../store";

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
}
type ProfileActionsType = ActionsType<typeof profileActions>;


type ThunkType = ThunkAction<void, ProfileStateType, unknown, ProfileActionsType>

export const getProfileThunkCreator = (userId: number): ThunkType => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(data));
}

export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch: any) => {
    let status = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(status));
}

export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch: any) => {
    let result = await profileAPI.updateStatus(status);
    if (result.resultCode === ResponseTypes.Success) {
        dispatch(profileActions.setStatus(status));
    }
}

export const uploadPhoto = (file: any): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.uploadPhoto(file);
    if (response.resultCode === 0) {
        dispatch(profileActions.updatePhoto(response.data.photos));
    }
}
export const uploadProfileData = (formData: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;

    let response = await profileAPI.uploadProfile(formData);
    if (response.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("profileData", { _error: response.messages[0] }))
    }
}


export default profileReducer;