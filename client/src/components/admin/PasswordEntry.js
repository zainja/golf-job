import React,{useState} from "react";
import axios from "axios"
import {withRouter} from 'react-router-dom';


const PasswordEntry = (props) => {
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    const onSubmit = (e) =>{
        e.preventDefault()
        if (password === ""){
            alert("password cannot be empty")
            return;
        }
        if (!props.hasPassword){
            if (password === "" || confirmPassword === ""){
                alert("password cannot be empty")
                return
            }else {
                if (password !== confirmPassword){
                    alert("password dont match")
                    return;
                }
            }
        }
        axios.post("/admin/enter-password", {username:
            props.username,
            hasPassword: props.hasPassword,
            password: password}).then(res => res.data)
            .then(data => {
                localStorage.setItem("admin-token", data.adminAccessToken)
                localStorage.setItem("role", data.role)
                props.history.push('/admin/main')

            }).catch(err => alert(err.response.data.msgs))
    }
    return(
        <form onSubmit={onSubmit} className="container">
        <div className="form-group" hidden={!props.userSubmitted}>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           placeholder="Password"/>
                </div>

                <div className="form-group" hidden={props.hasPassword || !props.userSubmitted}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           value={confirmPassword}
                           onChange={e => setConfirmPassword(e.target.value)}
                           placeholder="Repeat Password"/>
                   <small id="belowConfirm"/>
                </div>
                <button hidden={!props.userSubmitted} type="submit" className="btn btn-primary">Submit</button>
            </form>
    )
}
export default withRouter(PasswordEntry)