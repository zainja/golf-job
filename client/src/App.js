import React from "react";
import {ToastProvider} from 'react-toast-notifications'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from "./Landing";
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
import AdminRegister from "./components/admin/AdminRegister";
import Conversation from "./components/Conversation/Coversation";
import ConversationTab from "./components/Conversation/CoversationsTab";
import AdminRouter from "./components/routers/AdminRouter";
import NotesForm from "./components/Notes/NotesForm";
import AllNotes from "./components/Notes/AllNotes";
import Note from "./components/Notes/Note";
const App = () => {
    return (
        <ToastProvider>

            <BrowserRouter>
                <Switch>
                    <PrivateRouter exact path="/" component={Landing}/>
                    <PrivateRouter exact path="/conversation/:email" component={Conversation}/>
                    <RegisterRouter exact path="/confirm-sent" component={ConfirmationMessageSent}/>
                    <PrivateRouter exact path="/conversations" component={ConversationTab}/>
                    <AdminRouter exact path="/notes-form" component={NotesForm}/>
                    <PrivateRouter exact path="/notes" component={AllNotes}/>
                    <PrivateRouter exact path="/note/:id" component={Note}/>
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