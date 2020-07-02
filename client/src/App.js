import React from "react";
import {ToastProvider, useToasts} from 'react-toast-notifications'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
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
import AdminLogin from "./components/admin/AdminLogin";
import AdminRouter from "./components/routers/AdminRouter";
import AdminMainPage from "./components/admin/AdminMainPage";
import CreateUsers from "./components/admin/CreateUsers";

const App = () => {
    return (
        <ToastProvider>

            <BrowserRouter>
                <Switch>
                    <PrivateRouter exact path="/" component={Landing}/>
                    <RegisterRouter exact path="/confirm-sent" component={ConfirmationMessageSent}/>
                    <RegisterRouter exact path="/confirm/:id" component={ConfirmEmail}/>
                    <ResetPasswordRouter exact path="/reset/:id" component={ResetPasswordConfirmed}/>
                    <AdminRouter exact path="/admin/main" component={AdminMainPage}/>
                    <AdminRouter exact path="/admin/create-user" component={CreateUsers}/>
                    <Route exact path="/forgot-password" component={ResetPasswordRequest}/>
                    <Route exact path="/rejected-reset-password" component={ResetPasswordExpired}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/admin/login" component={AdminLogin}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </BrowserRouter>
        </ToastProvider>
    )

}

export default App