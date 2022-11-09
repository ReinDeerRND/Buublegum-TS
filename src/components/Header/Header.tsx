import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../../assets/images/logo.png"

type PropsType = {
  isLogged: boolean;
  login: string | null;
  logout: () => void
}
const Header: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.header_wrapper}>
      <img className={classes.header_img} src={logo} alt="logo" />
      <div className={classes.title}>BUBBLEGUM WEB</div>
      <div className={classes.login_container}>
        {props.isLogged ? <div>{props.login } <button onClick={props.logout}>Log out</button></div> : <NavLink to={"/login"}>Log in</NavLink>}
      </div>
    </div>
  );
}

export default Header;