import React from "react";
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from "../redux/store";

const mapPropsToState = (state: AppStateType) =>({
    isLogged: state.auth.isLogged
})

export type IsLoggedType = {
    isLogged: boolean;
}

export function withAuthRedirect<T extends IsLoggedType> (Component: React.ComponentType<T>) {
    const  ComponentWithAuthRedirect = (props: IsLoggedType) =>{
            if (!props.isLogged) {
                return <Redirect to="/login" />
            } else {
                return <Component {...(props as T)} />
            }
    }
    return connect(mapPropsToState)(ComponentWithAuthRedirect);
}