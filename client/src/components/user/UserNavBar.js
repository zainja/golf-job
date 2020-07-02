import React from "react";
import NavElement from "../navigation/NavElement"
import {withRouter} from 'react-router-dom'

const UserNavBar = (props) => {
    const logout = () =>{
        localStorage.clear()
        props.history.push("/admin/login")
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <NavElement to="/notes" title="Notes"/>
                    <NavElement to="/conversations" title="Conversations"/>
                    <button className="btn btn-danger my-2 my-lg-0"
                            type="button"
                            onClick={logout}>
                        Logout
                    </button>
                </ul>

            </nav>
        </div>
    )
}
export default withRouter(UserNavBar)