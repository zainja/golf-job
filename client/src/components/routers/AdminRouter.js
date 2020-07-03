import React from "react";

import { Route , Redirect, withRouter } from 'react-router-dom';
const AdminRouter = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('is-admin')  ? <Component />:
                    <Redirect to="/login"/>
            }
        />
    )
}
export default withRouter(AdminRouter);