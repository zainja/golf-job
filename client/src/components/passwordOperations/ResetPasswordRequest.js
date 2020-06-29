import React, {useState} from "react";
import {withRouter} from "react-router-dom"
import axios from 'axios'
const ResetPasswordRequest = (props) => {
    let [email, setEmail] = useState("")
    let [errorMessage, setErrorMessage] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post("/auth/request-reset-password",{email: email})
            .then(res => res.data)
            .then(data => {
                console.log(data)
                setErrorMessage("")
                localStorage.setItem("reset-password-token", data.resetPasswordToken)
                document.getElementById("alert").innerText = "Reset email sent"
            })
            .catch(err => setErrorMessage("Reset password request failed"))
    }
    return(
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1> Request Reset Password</h1>
            </div>
            <form className="container" onSubmit={onSubmit}>
                <h3 className="alert-success" id="alert"/>
                <h3 className="alert-danger">{errorMessage}</h3>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           value={email}
                           onChange={event => setEmail(event.target.value)}
                           required
                           placeholder="Enter email"/>
                </div>
                <button type="submit" className="btn btn-primary">Request Reset Password</button>
            </form>
        </div>
    )
}
export default withRouter(ResetPasswordRequest)