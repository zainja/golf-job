import React, {useState} from "react";
import axios from 'axios'
import {Link} from "react-router-dom";
import {useToasts } from 'react-toast-notifications'
import Login from "../Forms/Login";

const UserLogin = (props) => {
    const { addToast } = useToasts()

    const onSubmit = (email, password) => {
        axios.post('/auth/login', {
            email: email,
            password: password
        }).then(r => r.data)
            .then(data => {
                localStorage.setItem("access-token", data.accessToken)
                localStorage.setItem("refresh-token", data.refreshToken)
                props.history.push("/")

            })
            .catch(err =>{
                 console.log(err.response)
                addToast(err.response.data.error,{appearance: 'error',autoDismiss: true})
                }
            )

    }

    return(
        <Login onSubmit={onSubmit}/>
    )
}
export default UserLogin