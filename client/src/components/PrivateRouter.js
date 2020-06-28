import React from "react";
import { Route , Redirect } from 'react-router-dom';

const PrivateRouter = ({component: Component, ...rest}) => {
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
  export default PrivateRouter;