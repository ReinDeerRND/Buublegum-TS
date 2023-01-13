import classes from "./../Friends.module.css";

type PropsType = {
  name: string;
}

const Friend: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.friend_item}>
      {props.name}
    </div>
  );
}
export default Friend;