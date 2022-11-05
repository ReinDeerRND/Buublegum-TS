import Friends from "./Friends";
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
      friends: state.friendsWidget,
    }
  }
  let mapDispatchToProps = (dispatch) => {
    return {}
  }
  
  const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)
  export default FriendsContainer;