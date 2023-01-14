import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { requiredField, maxLength } from '../../../utils/validators';
import { TextareaControl } from '../../common/FormControls/FormControls';
import { PostType } from '../../../models/profile.model';

type PropsType = {
  posts: PostType[];
  addPost: (newPost: string) =>void;
}

const MyPosts: React.NamedExoticComponent<PropsType>= React.memo((props) => {
  let postList = props.posts.map(post => (<Post key={post.id} text={post.text} likesCount={post.likesCount} />))
  let onSubmit = (newPost: {newPost: string}) => {
    props.addPost(newPost.newPost);
  }
  return (
    <div className={classes.posts_container}>
      <div >
        <h3>Create New Post</h3>
        <NewPostFormRedux onSubmit={onSubmit} />
      </div>
      <div>
        {postList}
      </div>
    </div>
  )
})
type NewPostFormProps = {
  newPost: string;
}
const maxLength100 = maxLength(100);
const NewPostForm: React.FC<InjectedFormProps<NewPostFormProps, {}, string>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.myposts_form}>
        <Field
          component={TextareaControl}
          name="newPost"
          className={classes.mypost_textarea}
          placeholder="Enter New Post ..."
          validate={[requiredField, maxLength100]}
        />
        <button type="submit">Add Post</button>
      </div>
    </form>
  )
}

const NewPostFormRedux = reduxForm<NewPostFormProps, {}>({ form: "newPost" })(NewPostForm);

export default MyPosts;