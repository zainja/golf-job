import React from "react";
import {Link} from "react-router-dom";
const NavElement = (props) => {
    return(
        <ul className="nav-item">
            <Link to={props.to}>
                <h6 className="nav-link">{props.title}</h6>
            </Link>
        </ul>
    )
}
export default NavElement