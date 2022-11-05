import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapPropsToState = (state) =>({
    isLogged: state.auth.isLogged
})

export const withAuthRedirect = (Component) => {
    class ComponentWithAuthRedirect extends React.Component {
        render() {
            if (!this.props.isLogged) {
                return <Redirect to="/login" />
            }
            return <Component {...this.props} />
        }
    }

    return connect(mapPropsToState)(ComponentWithAuthRedirect);
}