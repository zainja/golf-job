import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Landing from "./components/Landing";
import Login from "./components/Login";
import PrivateRouter from "./components/PrivateRouter";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import ConfirmationMessageSent from "./components/emailValidation/ConfirmationMessageSent";
import ConfirmEmail from "./components/emailValidation/ConfirmEmail";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRouter exact path="/" component={Landing}/>
                <PrivateRouter exact path="/confirm-send" component={ConfirmationMessageSent}/>
                <PrivateRouter exact path="/confirm/:id" component={ConfirmEmail}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route component={PageNotFound}/>
            </Switch>
        </BrowserRouter>
    )

}

export default App