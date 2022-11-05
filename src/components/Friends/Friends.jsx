import Friend from "./Friend/Friend";
import classes from "./Friends.module.css";

const Friends = (props) => {
  let friends = props.friends.map(friend => (<Friend key = {friend.id} name={friend.name}/>))
  return (
    <div className={classes.wrapper}>
      { friends }
    </div>
  );
}
export default Friends;