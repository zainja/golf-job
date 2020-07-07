import React from "react";

import {Route, Redirect, withRouter} from 'react-router-dom';

const AdminRouter = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                const admin = localStorage.getItem('is-admin')
                if (admin === true) {
                    console.log(admin)
                    return <Component/>
                } else {
                    return <Redirect to="/"/>
                }
            }}
        />
    )
}
export default withRouter(AdminRouter);