import React from "react";
import { UserType } from "../../models/users.model";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
    selectedPage: number;
    totalCount: number;
    pageSize: number;
    onPageChanged: (page: number) => void;
    users: Array<UserType>;
    followUsersInProcess: Array<number>;
    followUserThunkCreator: (userId: number) => void;
    unfollowUserThunkCreator: (userId: number) => void;
}

const Users: React.FC<PropsType> = ({ selectedPage, totalCount, pageSize, onPageChanged, users, ...props }) => {
    return <div>
        <Paginator selectedPage={selectedPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged} />
        {
            users.map((user: UserType) => <User
                key={user.id}
                user={user}
                followUsersInProcess={props.followUsersInProcess}
                followUserThunkCreator={props.followUserThunkCreator}
                unfollowUserThunkCreator={props.unfollowUserThunkCreator}
            />)
        }
    </div>
}

export default Users;