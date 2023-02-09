import { ComponentType } from "react";
import {
  DecoratedComponentClass,
  DecoratedFormProps,
  InjectedFormProps,
  reduxForm,
} from "redux-form";
import { createControl, InputControl } from "../FormControls/FormControls";
import classes from "./Search.module.css";

type PropsType = {
  search: (searchValue: string) => void;
};
type FormDataProps = {
  search: string;
};
type ControlsTypes = keyof FormDataProps;

const Search: React.FC<PropsType> = (props) => {
  let onSubmit = (formData: { search: string }) => {
    props.search(formData.search);
  };
  return <SearchFormRedux onSubmit={onSubmit} />;
};

const SearchForm: ComponentType<
  InjectedFormProps<FormDataProps, {}, string>
> = (props) => {
  return (
    <div className={classes.form_wrapper}>
        <form onSubmit={props.handleSubmit} className={classes.new_message}>
            {createControl<ControlsTypes>(InputControl, "search", "Search user...", [], {})}
            <button type="submit">Search</button>
        </form>   
    </div>
  
  );
};

const SearchFormRedux: DecoratedComponentClass<
  FormDataProps,
  DecoratedFormProps<FormDataProps, {}, string>
> = reduxForm<FormDataProps, {}, string>({ form: "search" })(SearchForm);

export default Search;
