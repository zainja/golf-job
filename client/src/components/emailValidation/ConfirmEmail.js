import React, {useState, useEffect} from "react";
import axios from "axios";

import axiosInstance from "../../handlingTokens/authIntreceptor";
import {Link} from "react-router-dom";
const ConfirmEmail = (props) => {
    const [confirmMessage, setConfirm] = useState("")
    const [isConfirmed, setIsConfirmed] = useState(false)
    useEffect(() => {
        axiosInstance.put('/auth/validate', {},{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("register-token")}`
        }
        }).then(r => r.data)
            .then(data => {
                setConfirm("Email Has been confirmed")
                setIsConfirmed("true")
                localStorage.removeItem("register-token")
            })
            .catch(err => {
                console.log(err)
                if (err.status === 401){
                    props.history.push("/login")
                }
            })
    },[])
    return (
        <div className="container">
            <h1>{confirmMessage}</h1>
            {isConfirmed ? <Link to={"/login"}>
                <h5> Go to login page</h5>
            </Link> : null}
        </div>
    )

}
export default ConfirmEmail