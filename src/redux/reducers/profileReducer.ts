import { profileAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
import {
    ADD_POST,
    DELETE_POST,
    SET_USER_PROFILE,
    SET_STATUS,
    UPLOAD_PHOTO_SUCCESS,
    AddPostActionType,
    DeletePostActionType,
    ProfileStateType,
    ProfileType,
    SetUserProfileActionType,
    SetStatusActionType,
    UpdatePhotoActionType
} from '../models/profile.model';
import { PhotoType } from "../../models/users.model";

let initState: ProfileStateType = {
    profile: null,
    status: "",
    posts: [
        { id: 0, text: "Post 1 About ocean", likesCount: 3 },
        { id: 1, text: "Post 2 About Sun", likesCount: 42 }
    ],
};

const profileReducer = (state = initState, action: any): ProfileStateType => {
    switch (action.type) {
        case ADD_POST:
            let post = {
                id: state.posts.length,
                text: action.newPost,
                likesCount: 0
            };

            return {
                ...state,
                posts: [post, ...state.posts],

            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case UPLOAD_PHOTO_SUCCESS:
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

export const addPostActionCreator = (newPost: string): AddPostActionType => ({ type: ADD_POST, newPost });
export const deletePostCreator = (postId: number | null): DeletePostActionType => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
export const updatePhoto = (photos: PhotoType): UpdatePhotoActionType => ({ type: UPLOAD_PHOTO_SUCCESS, photos });

export const getProfileThunkCreator = (userId: number | null) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatusThunkCreator = (userId: number | null) => async (dispatch: any) => {
    let status = await profileAPI.getStatus(userId);
    dispatch(setStatus(status));
}

export const updateStatusThunkCreator = (status: string) => async (dispatch: any) => {
    let result = await profileAPI.updateStatus(status);
    if (result === 0) {
        dispatch(setStatus(status));
    }
}

export const uploadPhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.uploadPhoto(file);
    if (response.resultCode === 0) {
        dispatch(updatePhoto(response.data.photos));
    }
}
export const uploadProfileData = (formData: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;

    let response = await profileAPI.uploadProfile(formData);
    if (response.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("profileData", { _error: response.messages[0] }))
    }
}


export default profileReducer;