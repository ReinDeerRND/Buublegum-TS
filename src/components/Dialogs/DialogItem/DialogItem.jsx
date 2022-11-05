import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css'

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <NavLink className={classes.dialog_item} to={path} activeClassName={classes.active}>{props.name}</NavLink>
  )
}
export default DialogItem;