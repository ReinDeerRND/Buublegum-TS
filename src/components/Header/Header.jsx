import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.header_wrapper}>
      <img className={classes.header_img} src="https://e7.pngegg.com/pngimages/539/883/png-clipart-globe-earth-globe-miscellaneous-blue.png" alt="logo" />
      <div className={classes.login_container}>
        {props.isLogged ? <div>{props.login } <button onClick={props.logout}>Log out</button></div> : <NavLink to={"/login"}>Log in</NavLink>}
      </div>
    </div>
  );
}

export default Header;