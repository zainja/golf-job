import React from "react";
import {withRouter} from 'react-router-dom';
import UserNavBar from "./UserNavBar";
import Conversation from "./Coversation";
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
            <Conversation user="zainjaffal@gmail.com"/>
        </div>
    )
}
export default withRouter(Landing)