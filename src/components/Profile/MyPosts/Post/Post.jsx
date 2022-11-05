import classes from './Post.module.css'

const Post = (props) => {
  return (
    <div className = {classes.post_container}>
      <img alt="avatar" src="https://cs6.pikabu.ru/avatars/2097/x2097369-1271064885.png" />
      <div>{props.text}</div>
      <div className={classes.info_container}>
        <img src="https://banner2.cleanpng.com/20180429/tew/kisspng-facebook-like-button-computer-icons-social-network-5ae5bb33a392a7.15157648152500510767.jpg" alt="like" />
        <span>{props.likesCount}</span>
      </div>
    </div>
  )
}
export default Post;