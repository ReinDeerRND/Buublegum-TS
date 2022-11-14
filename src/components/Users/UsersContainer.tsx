import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuhRedirect';
import { UserType } from '../../models/users.model';
import {
    unfollowUserThunkCreator,
    getUsersThunkCreator,
    followUserThunkCreator,
    usersActions
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


type MapStateToPropsType = {
    selectedPage: number;
    pageSize: number;
    isLoading: boolean;
    users: Array<UserType>;
    totalCount: number;
    followUsersInProcess: Array<number>;
}
type MapDispatchToProps = {
    getUsersThunkCreator: (page: number, pageSize: number) => void;
    setSelectedPage: (page: number) => void;
    followUserThunkCreator: (userId: number) => void;
    unfollowUserThunkCreator: (userId: number) => void;
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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
    connect<MapStateToPropsType, MapDispatchToProps, {/* OwnPropsType */}, AppStateType>(
        mapStateToProps,
        {
            setSelectedPage: usersActions.setSelectedPage,
            getUsersThunkCreator,
            unfollowUserThunkCreator,
            followUserThunkCreator
        })
)(UsersClass);