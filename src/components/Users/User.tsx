import React from "react";
import { NavLink } from 'react-router-dom';
import classes from './Users.module.css';
import userPhoto from "../../assets/images/userphoto.jpg";
import { UserType } from "../../models/users.model";

type PropsType = {
    user: UserType
    followUsersInProcess: Array<number>;
    followUserThunkCreator: (userId: number) => void;
    unfollowUserThunkCreator: (userId: number) => void;
}

const User: React.FC<PropsType> = ({ user, followUsersInProcess, followUserThunkCreator, unfollowUserThunkCreator }) => {
    return <div className={classes.card_container}>
        <div className={classes.photo_container}>
            <NavLink to={"/profile/" + user.id}>
                <img src={user.photos.small ? user.photos.small : userPhoto} className={classes.photo} alt="{user.name}" />
            </NavLink>
            {
                user.followed
                    ? <button disabled={followUsersInProcess.some(u => user.id === u)} onClick={() => {
                        unfollowUserThunkCreator(user.id);
                    }}>Unfollow</button>
                    : <button disabled={followUsersInProcess.some(u => user.id === u)} onClick={() => {
                        followUserThunkCreator(user.id);
                    }}>Follow</button>
            }
        </div>
        <div className={classes.info_container}>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.status}>{user.status}</div>
        </div>
    </div>;
}
export default User;