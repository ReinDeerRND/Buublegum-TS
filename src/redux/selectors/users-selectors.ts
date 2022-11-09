import { createSelector } from 'reselect'
import { UserType } from '../../models/users.model'
import { AppStateType } from '../store'


const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
//reselect
// export const getFilterUsers = (state)=>{
//     return getUsers(state).filter(i=>true)
// }
// getUsers =>users
export const getUsersReselector = createSelector(getUsersSelector, (users) => {
    return users.filter((i: UserType)=> true)
})

export const getTotalCount = (state: AppStateType): number => {
    return state.usersPage.totalCount;
}
export const getPageSize = (state: AppStateType): number => {
    return state.usersPage.pageSize;
}
export const getSelectedPage = (state: AppStateType): number => {
    return state.usersPage.selectedPage;
}
export const getIsLoading = (state: AppStateType): boolean => {
    return state.usersPage.isLoading;
}

export const getFollowUsersInProcess = (state: AppStateType): Array<number> => {
    return state.usersPage.followUsersInProcess;
}