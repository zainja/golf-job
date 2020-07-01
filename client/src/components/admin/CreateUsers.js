import React,{useState} from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import AdminNavBar from "./AdminNavBar";

const CreateUsers = (props) => {
    const [username, setUsername] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const registerUser = () => {

    }
    return (
        <div>
            <AdminNavBar/>
            <form name="login" className="container" onSubmit={registerUser}>
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
                    <button className="btn btn-primary">
                        submit user
                    </button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(CreateUsers)