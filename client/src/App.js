import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Landing from "./components/Landing";
import Login from "./components/Login";
import PrivateRouter from "./components/routers/PrivateRouter";
import RegisterRouter from "./components/routers/RegisterRouter";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import ConfirmationMessageSent from "./components/emailValidation/ConfirmationMessageSent";
import ConfirmEmail from "./components/emailValidation/ConfirmEmail";
import ResetPasswordRouter from "./components/routers/ResetPasswordRouter";
import ResetPasswordRequest from "./components/passwordOperations/ResetPasswordRequest";
import ResetPasswordConfirmed from "./components/passwordOperations/ResetPasswordConfirmed";
import ResetPasswordExpired from "./components/passwordOperations/ResetPasswordExpired";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRouter exact path="/" component={Landing}/>
                <RegisterRouter exact path="/confirm-sent" component={ConfirmationMessageSent}/>
                <RegisterRouter exact path="/confirm/:id" component={ConfirmEmail}/>
                <ResetPasswordRouter exact path="/reset/:id" component={ResetPasswordConfirmed}/>
                <Route exact path="/forgot-password" component={ResetPasswordRequest}/>
                <Route exact path="/rejected-reset-password" component={ResetPasswordExpired}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route component={PageNotFound}/>
            </Switch>
        </BrowserRouter>
    )

}

export default App