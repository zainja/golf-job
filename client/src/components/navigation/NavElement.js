import React from "react";
import {Link} from "react-router-dom";
const NavElement = (props) => {
    return(
        <li className="nav-item">
            <Link to={props.to}/>
            <h3 className="nav-link">{props.title}</h3>
        </li>
    )
}