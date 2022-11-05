import { createSelector } from 'reselect'

const getUsersSelector = (state) => {
    return state.usersPage.users
}
//reselect
// export const getFilterUsers = (state)=>{
//     return getUsers(state).filter(i=>true)
// }
// getUsers =>users
export const getUsersReselector = createSelector(getUsersSelector, (users) => {
    return users.filter(i => true)
})

export const getTotalCount = (state) => {
    return state.usersPage.totalCount;
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getSelectedPage = (state) => {
    return state.usersPage.selectedPage;
}
export const getIsLoading = (state) => {
    return state.usersPage.isLoading;
}

export const getFollowUsersInProcess = (state) => {
    return state.usersPage.followUsersInProcess;
}