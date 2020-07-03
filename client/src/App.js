import React from "react";
import {ToastProvider, useToasts} from 'react-toast-notifications'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Landing from "./components/user/Landing";
import UserLogin from "./components/user/UserLogin";
import PrivateRouter from "./components/routers/PrivateRouter";
import RegisterRouter from "./components/routers/RegisterRouter";
import PageNotFound from "./components/PageNotFound";
import UserRegister from "./components/user/UserRegister";
import ConfirmationMessageSent from "./components/emailValidation/ConfirmationMessageSent";
import ConfirmEmail from "./components/emailValidation/ConfirmEmail";
import ResetPasswordRouter from "./components/routers/ResetPasswordRouter";
import ResetPasswordRequest from "./components/passwordOperations/ResetPasswordRequest";
import ResetPasswordConfirmed from "./components/passwordOperations/ResetPasswordConfirmed";
import ResetPasswordExpired from "./components/passwordOperations/ResetPasswordExpired";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRouter from "./components/routers/AdminRouter";
import AdminRegister from "./components/admin/AdminRegister";
import axios from 'axios'
import Conversation from "./components/Conversation/Coversation";
import ConversationTab from "./components/Conversation/CoversationsTab";
const App = () => {
    return (
        <ToastProvider>

            <BrowserRouter>
                <Switch>
                    <PrivateRouter exact path="/" component={Landing}/>
                    <PrivateRouter exact path="/conversation/:email" component={Conversation}/>
                    <RegisterRouter exact path="/confirm-sent" component={ConfirmationMessageSent}/>
                    <PrivateRouter exact path="/conversations" component={ConversationTab}/>
                    <RegisterRouter exact path="/confirm/:id" component={ConfirmEmail}/>
                    <ResetPasswordRouter exact path="/reset/:id" component={ResetPasswordConfirmed}/>
                    <Route exact path="/forgot-password" component={ResetPasswordRequest}/>
                    <Route exact path="/rejected-reset-password" component={ResetPasswordExpired}/>
                    <Route exact path="/login" component={UserLogin}/>
                    <Route exact path="/register" component={UserRegister}/>
                    <Route exact path="/admin/login" component={AdminLogin}/>
                    <Route exact path="/admin/register" component={AdminRegister}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </BrowserRouter>
        </ToastProvider>
    )

}

export default App