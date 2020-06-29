import React,{useState, useEffect} from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom';
const ResetPasswordConfirmed = (props) => {
    let [confirmReset, setConfirmReset] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
         if (password === confirmPassword){
            axios.post('/auth/reset-password', {password: password},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("reset-password-token")}`
                }})
                .then(res => {
                    localStorage.removeItem('reset-password-token')
                    props.history.push("/login")
                })
                .catch(err => console.log(err))
        }else {
             document.getElementById("confirmPassword").setCustomValidity("Passwords dont match")
         }
    }
    return(

        <div>
            <div className="container-fluid jumbotron text-center">
                <h1> Enter Password to reset</h1>
            </div>
            <h1>{confirmReset}</h1>
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                           required
                           placeholder="Password"/>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           value={confirmPassword}
                           onChange={event => setConfirmPassword(event.target.value)}
                           required
                           placeholder="Repeat Password"/>
                   <small id="belowConfirm"/>
                </div>
                <button type="submit" className="btn btn-primary">Request Reset Password</button>
            </form>
        </div>
    )
}
export default withRouter(ResetPasswordConfirmed)