import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({ selectedPage, totalCount, pageSize, onPageChanged, users, ...props }) => {

    return <div>
        <Paginator selectedPage={selectedPage} totalCount={totalCount} pageSize={pageSize} onPageChanged={onPageChanged} />
        {
            users.map(user => <User 
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