import React, {useState} from "react";
import axios from 'axios'
import {useToasts} from 'react-toast-notifications'
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
                localStorage.setItem("email", email)
                localStorage.setItem("first-name", data.firstName)
                localStorage.setItem("last-name", data.lastName)
                localStorage.setItem("phone-number", data.phoneNumber)
                localStorage.setItem("is-admin", data.isAdmin)
                addToast(data.msgs, {appearance: 'success', autoDismiss: true})
                props.history.push("/")

            })
            .catch(err => {
                    addToast(err.response.data.error,{appearance: 'error',autoDismiss: true})
                    localStorage.setItem('register-token', err.response.data.registerToken)
                }
            )

    }

    return(
        <Login onSubmit={onSubmit} title="Login Page"/>
    )
}
export default UserLogin