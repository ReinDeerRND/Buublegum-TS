import classes from './Post.module.css'
import smile from '../../../../assets/images/face_smile.png';
import likeIcon from '../../../../assets/icons/like.jpg';

type PropsType = {
  text: string;
  likesCount: number;
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className = {classes.post_container}>
      <img alt="avatar" src={smile} />
      <div>{props.text}</div>
      <div className={classes.info_container}>
        <img src={likeIcon} alt="like" />
        <span>{props.likesCount}</span>
      </div>
    </div>
  )
}
export default Post;