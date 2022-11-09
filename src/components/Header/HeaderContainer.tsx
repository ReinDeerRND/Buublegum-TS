import { connect } from "react-redux";
import React from "react";
import { logout } from "../../redux/reducers/authReducer";
import Header from "./Header";
import { AppStateType } from "../../redux/store";

type PropsType = {
  isLogged: boolean;
  login: string | null;
  logout: () => void
}

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return (<Header {...this.props} />);
  }
}

type MapStateToPropsType = {
  isLogged: boolean;
  login: string | null;
}
type MapDispatchToPropsType = {
  logout: () => (dispatch: any) => Promise<any>
}



const mapStateToProps = (state: AppStateType) => {
  return {
    isLogged: state.auth.isLogged,
    login: state.auth.login,
  }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);