import React from "react";
import classes from './Users.module.css';
import * as axios from "axios";
import userPhoto from "../../assets/images/userphoto.jpg";

//this component is not included in code
const UsersPrevious = (props) => {
    if (props.users.length === 0 ){
        axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then(res=>props.setUsers(res.data.items));
    }

    return <div>
        {
            props.users.map(user => <div key={user.id} className={classes.card_container}>
                <div className={classes.photo_container}>
                    <img src={user.photos.small? user.photos.small : userPhoto } className={classes.photo} alt="{user.name}" />
                    {
                        user.followed
                            ? <button onClick={() => { props.unfollow(user.id) }}>Unfollow</button>
                            : <button onClick={()=>{ props.follow(user.id)}}>Follow</button>
                    }
                </div>
                <div className={classes.info_container}>
                    <div className={classes.name}>{user.name}</div>
                    <div className={classes.location}>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </div>
                    <div className={classes.status}>{user.status}</div>
                </div>
            </div>)
        }
    </div>
}
export default UsersPrevious;