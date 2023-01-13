import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { profileActions } from "../../../redux/reducers/profileReducer";
import { AppStateType } from '../../../redux/store';
import MyPosts from './MyPosts';

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts
  }
}
let mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addPost: (text: string) => dispatch(profileActions.addPostActionCreator(text))
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;