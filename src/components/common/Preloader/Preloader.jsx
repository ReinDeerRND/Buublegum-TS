import loader from "../../../assets/images/loading.gif";
import classes from './Preloader.module.css';

let Preloader = () => {
    return (
        <div className={classes.loader}>
            <img src={loader} alt="Loading..." />
        </div>
    )
}
export default Preloader;