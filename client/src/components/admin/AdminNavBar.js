import React from "react";
import NavElement from "../navigation/NavElement";

const AdminNavBar = (props) => {

    const logout = () =>{
        localStorage.clear()
        props.history.push("/admin/login")
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Admin Panel</a>
                <ul className="navbar-nav">
                    <NavElement to="/classes" title="Classes"/>
                    <NavElement to="/" title="Users"/>
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
export default AdminNavBar