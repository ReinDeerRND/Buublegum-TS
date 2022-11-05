import { connect } from "react-redux";
import React from "react";
import { logout } from "../../redux/reducers/authReducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  render() {
    return (<Header {...this.props} />);
  }

}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    login: state.auth.login,
  }
}
export default connect(mapStateToProps, {logout })(HeaderContainer);