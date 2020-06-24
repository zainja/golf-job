import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Landing from "./components/Landing";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route component={PageNotFound}/>
            </Switch>
        </BrowserRouter>
    )

}

export default App