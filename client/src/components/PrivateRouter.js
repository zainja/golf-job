import React from "react";

import { Route , Redirect, withRouter } from 'react-router-dom';
const PrivateRouter = ({component: Component, ...rest}) => {
    console.log(localStorage.getItem('access-token'))
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('access-token')  ? (<Component />):
                    <Redirect to="/login"/>
            }
        />
    )
}
export default withRouter(PrivateRouter);