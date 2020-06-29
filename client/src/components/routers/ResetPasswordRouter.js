import React from "react";

import { Route , Redirect, withRouter } from 'react-router-dom';
const ResetPasswordRouter = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('reset-password-token')  ? <Component />:
                    <Redirect to="/login"/>
            }
        />
    )
}
export default withRouter(ResetPasswordRouter);