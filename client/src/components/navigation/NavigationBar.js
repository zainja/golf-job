import React from "react";
import NavElement from "./NavElement"
import {withRouter} from 'react-router-dom'

const NavigationBar = (props) => {
    const logout = () => {
        localStorage.clear()
        props.history.push("/login")
    }
    let title = props.title
    if (title === null){
        console.log(title)
        title = "Golf App"
    }
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">{title}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                </div>
            </nav>
    )
}
export default withRouter(NavigationBar)