import React from "react";
import {Link, withRouter} from 'react-router-dom';

const AdminConsole = (props) => {
    return(
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul>
                    <Link to="#">
                        <a>Main</a>
                    </Link>
                </ul>
            </nav>
            <h1> Admin</h1>
        </div>
    )
}
export default withRouter(AdminConsole)