import React from "react";
import NavElement from "../navigation/NavElement"
import {withRouter} from 'react-router-dom'

const UserNavBar = (props) => {
    const logout = () =>{
        localStorage.clear()
        props.history.push("/login")
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <NavElement to="/" title="Home"/>
                </ul>
                <ul className="navbar-nav">
                    <NavElement to="/notes" title="Notes"/>
                    <NavElement to="/conversations" title="Conversations"/>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <button className="btn btn-danger" onClick={logout}> Logout</button>
                </ul>
            </nav>
        </div>
    )
}
export default withRouter(UserNavBar)