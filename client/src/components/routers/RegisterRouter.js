import React from "react";

import { Route , Redirect, withRouter } from 'react-router-dom';
const PrivateRouter = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('register-token')  ? <Component />:
                    <Redirect to="/login"/>
            }
        />
    )
}
export default withRouter(PrivateRouter);