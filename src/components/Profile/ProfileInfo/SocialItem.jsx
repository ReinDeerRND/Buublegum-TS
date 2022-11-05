import classes from './SocialItem.module.css';

let SocialItem = (props) => {
    const styleName = classes[props.title];
    return (
        <div className={classes.social}>
            <div className={styleName}></div><span>{props.social}</span>
        </div>
    )
}

export default SocialItem;