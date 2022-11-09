import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css'

type PropsType = {
  id: number;
  name: string | null;
}
const DialogItem: React.FC<PropsType> = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <NavLink className={classes.dialog_item} to={path} activeClassName={classes.active}>{props.name}</NavLink>
  )
}
export default DialogItem;