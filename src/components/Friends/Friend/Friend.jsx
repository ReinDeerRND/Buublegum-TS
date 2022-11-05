import classes from "./../Friends.module.css";

const Friend = (props) => {
  return (
    <div className={classes.friend_item}>
      {props.name}
    </div>
  );
}
export default Friend;