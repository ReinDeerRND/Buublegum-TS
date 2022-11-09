import React from "react";
import { FriendType } from "../../models/friends.model";
import Friend from "./Friend/Friend";
import classes from "./Friends.module.css";

type PropsType = {
  friends: Array<FriendType>
}
const Friends: React.FC<PropsType> = (props) => {
  let friends = props.friends.map(friend => (<Friend key = {friend.id} name={friend.name}/>))
  return (
    <div className={classes.wrapper}>
      { friends }
    </div>
  );
}
export default Friends;