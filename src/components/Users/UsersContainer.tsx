import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuhRedirect';
import {
    setSelectedPage,
    getUsersThunkCreator,
    followUserThunkCreator,
    unfollowUserThunkCreator
} from '../../redux/reducers/usersReducer';
import {
    getTotalCount,
    getUsersReselector,
    getPageSize,
    getSelectedPage,
    getIsLoading,
    getFollowUsersInProcess
} from '../../redux/selectors/users-selectors';
import { AppStateType } from '../../redux/store';
import UsersClass from './UsersClass';

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersReselector(state),
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        selectedPage: getSelectedPage(state),
        isLoading: getIsLoading(state),
        followUsersInProcess: getFollowUsersInProcess(state),
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        setSelectedPage, getUsersThunkCreator, unfollowUserThunkCreator, followUserThunkCreator
    })
)(UsersClass);