import { userAPI } from "../../api/api";
import { UserType } from "../../models/users.model";
import { updateArray } from "../../utils/object-convert";
import {
    FOLLOW,
    UNFOLLOW,
    SET_USERS,
    SET_TOTAL_COUNT,
    SET_SELECTED_PAGE,
    TOGGLE_LOADING,
    TOGGLE_FOLLOW,
    UsersStateType,
    SetFollowType,
    SetUnollowType,
    SetUsersType,
    SetTotalCountType,
    SetSelectedPageType,
    ToggleLoadingType,
    ToggleFollowingType,
} from "../models/users.model";

let initState: UsersStateType = {
    users: [],
    totalCount: 0,
    pageSize: 51,
    selectedPage: 0,
    isLoading: false,
    followUsersInProcess: []
};

const usersReducer = (state = initState, action: any): UsersStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateArray(state.users, "id", action.userId, { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateArray(state.users, "id", action.userId, { followed: false })
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

export const setFollow = (userId: number): SetFollowType => ({ type: FOLLOW, userId });
export const setUnfollow = (userId: number): SetUnollowType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: UserType[]): SetUsersType => ({ type: SET_USERS, users });
export const setTotalCount = (count: number): SetTotalCountType => ({ type: SET_TOTAL_COUNT, count });
export const setSelectedPage = (pageNumber: number): SetSelectedPageType => ({ type: SET_SELECTED_PAGE, pageNumber });
export const toggleLoading = (isLoading: boolean): ToggleLoadingType => ({ type: TOGGLE_LOADING, isLoading });
export const toggleFollowing = (isLoading: boolean, userId: number): ToggleFollowingType => ({ type: TOGGLE_FOLLOW, isLoading, userId });
//thunks
export const getUsersThunkCreator = (selectedPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleLoading(true));
    let data = await userAPI.getUsers(selectedPage + 1, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleLoading(false));
}

export const followUserThunkCreator = (userId: number) => (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, setFollow, userAPI.followUser.bind(userAPI));
}

export const unfollowUserThunkCreator = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, setUnfollow, userAPI.unfollowUser.bind(userAPI));
}

const followUnfollowFlow = async (dispatch: any, userId: number, setAction: any, apiFn: Function) => {
    dispatch(toggleFollowing(true, userId));
    let res = await apiFn(userId)
    if (res.data.resultCode === 0) {
        dispatch(setAction(userId))
    }
    dispatch(toggleFollowing(false, userId));
}

export default usersReducer;