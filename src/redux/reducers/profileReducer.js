import { profileAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "profile/ADD-POST";
const DELETE_POST = "profile/DELETE_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const UPLOAD_PHOTO_SUCCESS = "profile/UPLOAD_PHOTO_SUCCESS";

let initState = {
    profile: null,
    status: "",
    posts: [
        { id: 0, text: "Post 1 About ocean", likesCount: 3 },
        { id: 1, text: "Post 2 About Sun", likesCount: 42 }
    ],
};

const profileReducer = (state = initState, action) => {
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
                    ...state.profile,
                    photos: action.photos
                }
            }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPost) => ({ type: ADD_POST, newPost });
export const deletePostCreator = (postId) => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const updatePhoto = (photos) => ({ type: UPLOAD_PHOTO_SUCCESS, photos });

export const getProfileThunkCreator = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatusThunkCreator = (userId) => async (dispatch) => {
    let status = await profileAPI.getStatus(userId);
    dispatch(setStatus(status));
}

export const updateStatusThunkCreator = (status) => async (dispatch) => {
    let result = await profileAPI.updateStatus(status);
    if (result === 0) {
        dispatch(setStatus(status));
    }
}

export const uploadPhoto = (file) => async (dispatch) => {
    let response = await profileAPI.uploadPhoto(file);
    if (response.resultCode === 0) {
        dispatch(updatePhoto(response.data.photos));
    }
}
export const uploadProfileData = (formData) => async (dispatch, getState) => {
    const userId = getState().auth.userId;

    let response = await profileAPI.uploadProfile(formData);
    if (response.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("profileData", { _error: response.messages[0] }))
    }
}


export default profileReducer;