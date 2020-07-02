import React, {useState} from "react";
import axios from 'axios'
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
                addToast(data.msgs, {appearance: 'success', autoDismiss: true})
                props.history.push("/")

            })
            .catch(err =>{
                 console.log(err.response)
                addToast(err.response.data.error,{appearance: 'error',autoDismiss: true})
                }
            )

    }

    return(
        <Login onSubmit={onSubmit} title="Login Page"/>
    )
}
export default UserLogin