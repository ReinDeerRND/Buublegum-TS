import { userAPI } from "../../api/api";
import { updateArray } from "../../utils/object-convert";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_TOTAL_COUNT = "users/SET_TOTAL_COUNT";
const SET_SELECTED_PAGE = "users/SET_SELECTED_PAGE";
const TOGGLE_LOADING = "users/TOGGLE_LOADING";
const TOGGLE_FOLLOW = "users/TOGGLE_FOLLOW"

let initState = {
    users: [],
    totalCount: 0,
    pageSize: 50,
    selectedPage: 0,
    isLoading: false,
    followUsersInProcess: []
};

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateArray(state.users, "id", action.userId, {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users:updateArray(state.users, "id", action.userId, {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.count
            }
        case SET_SELECTED_PAGE:
            return {
                ...state,
                selectedPage: action.pageNumber
            }
        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOGGLE_FOLLOW:
            return {
                ...state,
                followUsersInProcess: action.isLoading
                    ? [...state.followUsersInProcess, action.userId]
                    : state.followUsersInProcess.map(user => user !== action.userId)
            }
        default:
            return state;
    }
}

export const setFollow = (userId) => ({ type: FOLLOW, userId });
export const setUnfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setTotalCount = (count) => ({ type: SET_TOTAL_COUNT, count });
export const setSelectedPage = (pageNumber) => ({ type: SET_SELECTED_PAGE, pageNumber });
export const toggleLoading = (isLoading) => ({ type: TOGGLE_LOADING, isLoading });
export const toggleFollowing = (isLoading, userId) => ({ type: TOGGLE_FOLLOW, isLoading, userId });
//thunks
export const getUsersThunkCreator = (selectedPage, pageSize) => async (dispatch) => {
    dispatch(toggleLoading(true));
    let data = await userAPI.getUsers(selectedPage + 1, pageSize)
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleLoading(false));
}

export const followUserThunkCreator = (userId) => (dispatch) => {
    followUnfollowFlow(dispatch, userId, setFollow, userAPI.followUser.bind(userAPI));
}

export const unfollowUserThunkCreator = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, setUnfollow, userAPI.unfollowUser.bind(userAPI));
}

const followUnfollowFlow = async (dispatch, userId, setAction,  apiFn)=>{
    dispatch(toggleFollowing(true, userId));
    let res = await apiFn(userId)
    if (res.data.resultCode === 0) {
        dispatch(setAction(userId))
    }
    dispatch(toggleFollowing(false, userId));
}

export default usersReducer;