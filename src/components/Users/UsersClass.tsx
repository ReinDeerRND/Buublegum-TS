import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { UserType } from "../../models/users.model";

type PropsType = {
    selectedPage: number;
    pageSize: number;
    isLoading: boolean;
    users: Array<UserType>;
    totalCount: number;
    followUsersInProcess: Array<number>;
    getUsersThunkCreator: (page: number, pageSize: number) => void;
    setSelectedPage: (page: number) => void;
    followUserThunkCreator: (userId: number) => void;
    unfollowUserThunkCreator: (userId: number) => void;
}
class UsersClass extends React.Component<PropsType> {

    componentDidMount() {
        this.getUsers(this.props.selectedPage);
    }

    getUsers(page: number) {
        this.props.getUsersThunkCreator(page, this.props.pageSize)
    }

    onPageChanged(page: number) {
        this.props.setSelectedPage(page);
        this.getUsers(page);
    }

    render() {
        return <>
            {this.props.isLoading ? <Preloader /> :
                <Users
                    selectedPage={this.props.selectedPage}
                    users={this.props.users}
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    onPageChanged={this.onPageChanged.bind(this)}
                    followUsersInProcess={this.props.followUsersInProcess}
                    unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
                    followUserThunkCreator={this.props.followUserThunkCreator}
                ></Users>
            }
        </>
    }

}
export default UsersClass;