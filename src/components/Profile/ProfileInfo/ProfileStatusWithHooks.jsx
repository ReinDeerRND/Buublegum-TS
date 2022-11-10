import React from "react";
import { useState, useEffect } from "react";
import classes from './ProfileStatus.module.css';
import pencil from '../../../assets/icons/pen.png'

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status && "no status yet")

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true);
        }
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div className={classes.status_container}>
            {
                !editMode &&
                <div onDoubleClick={activateEditMode}>
                    <span >{status}</span>
                    {
                        props.isOwner &&
                        <img className={classes.pencil} src={pencil} alt="edit" />
                    }
                </div>
            }
            {
                editMode &&
                <div>
                    <input autoFocus
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={onStatusChange} />
                </div>
            }
        </div>
    )

}

export default ProfileStatusWithHooks;