import React, {useState} from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import AdminNavBar from "./AdminNavBar";

const CreateUsers = (props) => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [role, setRole] = useState("Employee")
    const [alertMessage, setAlertMessage] = useState("")
    const registerUser = (e) => {
        e.preventDefault()
        axios.post("/admin/create-user", {username: username,
            firstName: firstName, lastName: lastName, userRole: role.toLowerCase()}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("admin-token")}`
            }
        })
            .then(response => response.data)
            .then(data => setAlertMessage(data.msgs))
            .catch(err => setAlertMessage(err.response.data.msgs))
    }
    return (
        <div>
            <AdminNavBar/>
            <form name="login" className="container mt-lg-5" onSubmit={registerUser}>
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
                </div>
                    <div className="form-group">
                        <label htmlFor="firstName"> First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName"> Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label> Type</label>
                        <select className="form-control" value={role}
                                onChange={event => setRole(event.target.value)}>
                        <option>Employee</option>
                        <option>Admin</option>
                        </select>
                    </div>

                    <br/>
                    <button className="btn btn-primary">
                        submit user
                    </button>
            </form>
        </div>
    )
}

export default withRouter(CreateUsers)