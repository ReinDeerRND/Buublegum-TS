import { Dispatch } from "redux";
import { userAPI } from "../../api/users-api";
import { ResponseTypes } from "../../api/api.model";
import { UserType } from "../../models/users.model";
import { updateArray } from "../../utils/object-convert";
import { ActionsType, ThunkType } from "../store";

export type UsersStateType = {
    users: UserType[];
    totalCount: number;
    pageSize: number;
    selectedPage: number;
    isLoading: boolean;
    followUsersInProcess: number[]
}

let initState: UsersStateType = {
    users: [],
    totalCount: 0,
    pageSize: 51,
    selectedPage: 0,
    isLoading: false,
    followUsersInProcess: []
};

const usersReducer = (state = initState, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case "users/FOLLOW":
            return {
                ...state,
                users: updateArray(state.users, "id", action.userId, { followed: true })
            }
        case "users/UNFOLLOW":
            return {
                ...state,
                users: updateArray(state.users, "id", action.userId, { followed: false })
            }
        case "users/SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "users/SET_TOTAL_COUNT":
            return {
                ...state,
                totalCount: action.count
            }
        case "users/SET_SELECTED_PAGE":
            return {
                ...state,
                selectedPage: action.pageNumber
            }
        case "users/TOGGLE_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            }
        case "users/TOGGLE_FOLLOW":
            return {
                ...state,
                followUsersInProcess: action.payload.isLoading
                    ? [...state.followUsersInProcess, action.payload.userId]
                    : state.followUsersInProcess.filter(user => user !== action.payload.userId)
            }
        default:
            return state;
    }
}

export const usersActions = {
    setFollow: (userId: number) => ({ type: "users/FOLLOW", userId } as const),
    setUnfollow: (userId: number) => ({ type: "users/UNFOLLOW", userId } as const),
    setUsers: (users: UserType[]) => ({ type: "users/SET_USERS", users } as const),
    setTotalCount: (count: number) => ({ type: "users/SET_TOTAL_COUNT", count } as const),
    setSelectedPage: (pageNumber: number) => ({ type: "users/SET_SELECTED_PAGE", pageNumber } as const),
    toggleLoading: (isLoading: boolean) => ({ type: "users/TOGGLE_LOADING", isLoading } as const),
    toggleFollowing: (isLoading: boolean, userId: number) => ({ type: "users/TOGGLE_FOLLOW", payload: { isLoading, userId } } as const),
}
type UsersActionsType  = ActionsType<typeof usersActions>;

//thunks
// dispatch: Dispatch<UsersActionsType>, getState: ()=>UsersStateType
type UsersThunkType = ThunkType< UsersStateType, UsersActionsType>;

export const getUsersThunkCreator = (selectedPage: number, pageSize: number): UsersThunkType => async (dispatch) => {
    dispatch(usersActions.toggleLoading(true));
    let data = await userAPI.getUsers(selectedPage + 1, pageSize);
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalCount(data.totalCount));
    dispatch(usersActions.toggleLoading(false));
}

export const followUserThunkCreator = (userId: number): UsersThunkType => (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersActions.setFollow, userAPI.followUser.bind(userAPI));
}

export const unfollowUserThunkCreator = (userId: number): UsersThunkType => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersActions.setUnfollow, userAPI.unfollowUser.bind(userAPI));
}

const followUnfollowFlow = async (
    dispatch: Dispatch<UsersActionsType>,
    userId: number,
    setAction: typeof usersActions.setFollow | typeof usersActions.setUnfollow,
    apiFn: (userId: number) => any
): Promise<void> => {
    dispatch(usersActions.toggleFollowing(true, userId));
    let res = await apiFn(userId)
    if (res.resultCode === ResponseTypes.Success) {
        dispatch(setAction(userId))
    }
    dispatch(usersActions.toggleFollowing(false, userId));
}

export default usersReducer;