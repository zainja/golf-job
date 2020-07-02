import React from "react";
import {withRouter} from 'react-router-dom';
import UserNavBar from "./UserNavBar";
const Landing = (props) => {
    console.log(props)
    const logout = ()=> {
        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
        props.history.push("/login")
    }
    return(
        <div>
            <UserNavBar/>
            <h1>Main Page</h1>
        </div>
    )
}
export default withRouter(Landing)