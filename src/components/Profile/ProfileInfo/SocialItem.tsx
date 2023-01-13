import React from 'react';
import classes from './SocialItem.module.css';

type PropsType = {
    title: string;
    social: string;
}

const SocialItem: React.FC<PropsType> = (props) => {
    const styleName = classes[props.title];
    return (
        <div className={classes.social}>
            <div className={styleName}></div><span>{props.social}</span>
        </div>
    )
}

export default SocialItem;