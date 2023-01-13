import Friends from "./Friends";
import { connect } from 'react-redux';
import { AppStateType } from "../../redux/store";

let mapStateToProps = (state: AppStateType) => {
    return {
      friends: state.friendsWidget,
    }
  }
  // let mapDispatchToProps = (dispatch) => {
  //   return {}
  // }
  
  const FriendsContainer = connect(mapStateToProps, {}/*mapDispatchToProps*/)(Friends)
  export default FriendsContainer;