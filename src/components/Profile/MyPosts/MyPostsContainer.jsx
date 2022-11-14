import { connect } from 'react-redux';
import { profileActions } from "../../../redux/reducers/profileReducer";
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (text) => dispatch(profileActions.addPostActionCreator(text))
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;