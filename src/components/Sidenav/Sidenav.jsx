import { NavLink } from "react-router-dom";
import FriendsContainer from "../Friends/FriendsContainer";
import classes from "./Sidenav.module.css";

// let classes ={
//   "item": "Uniq_name_put_automatically"
// }
//  joim classes: <div className={`${classes.item} ${classes.active}`}>



const Sidenav = (props) => {
  return (
    <div className={classes.menu_wrapper}>
      <div className={classes.item}>
        <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/users" activeClassName={classes.active}>Users</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" activeClassName={classes.active}>News </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" activeClassName={classes.active}>Music</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink>
      </div>
      <FriendsContainer />
    </div>
  );
}
export default Sidenav;