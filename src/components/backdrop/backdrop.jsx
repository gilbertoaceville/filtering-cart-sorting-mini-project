import classes from "./backdrop.module.css";
import { useDispatch } from "react-redux";
import { BackdropToggler } from "../../redux/actions/backdropActions";

const Backdrop = () => {
  const dispatch = useDispatch();

  const clearOutBackdrop = () => {
    dispatch(BackdropToggler(false));
  }
  return <div className={classes.backdrop} onClick={clearOutBackdrop}></div>;
};

export default Backdrop;
