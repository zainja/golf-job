import React,{useState, useEffect} from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import PasswordEntry from "./PasswordEntry";
const AdminLogin = (props) => {
    let [username, setUsername] = useState("")
    let [alertMessage, setAlertMessage] = useState("")
    let [hasPassword, setHasPassword] = useState(false)
    let [userSubmitted, setUserSubmitted] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("admin-token") !== null){
            props.history.push("/admin/main")
        }
    },[])
    const submitUserName = () => {
        axios.post("/admin/enter-user",{username: username})
            .then(response => response.data)
            .then(data => {
                setAlertMessage("user name has been submitted")
                setHasPassword(data.hasPassword)
                document.getElementById("usernamebtn").hidden = true
                setUserSubmitted(true)
            }).catch(err => {
                setAlertMessage(err.response.data.msgs)
            })
    }

    return(
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1>Admin Login Panel</h1>
            </div>
            <form name="login" className="container" onSubmit={submitUserName}>
                <h3 className="alert-warning" id="showResponse">{alertMessage}</h3>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                           className="form-control"
                           id="username"
                           value={username}
                           onChange={(event => setUsername(event.target.value))}
                           required
                           placeholder="Enter username"
                    />
                    <br/>
                    <button id="usernamebtn"
                            type="button"
                            onClick={submitUserName}
                            className="btn btn-primary">
                        submit user
                    </button>
                </div>
            </form>
            <PasswordEntry userSubmitted={userSubmitted} hasPassword={hasPassword} username={username}/>
        </div>
    )
}
export default withRouter(AdminLogin)