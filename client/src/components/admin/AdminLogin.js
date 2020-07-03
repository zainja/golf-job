import React, {useState, useEffect} from "react";
import axios from 'axios'
import {useToasts} from 'react-toast-notifications'
import Login from "../Forms/Login";

const AdminLogin = (props) => {
    const {addToast} = useToasts()
    const onSubmit = (email, password) => {
        axios.post("/admin/login",{email: email, password: password})
            .then(response => response.data)
            .then(data => {
                console.log(data)
                localStorage.setItem("access-token", data.accessToken)
                localStorage.setItem("email", email)
                localStorage.setItem("first-name", data.firstName)
                localStorage.setItem("last-name", data.lastName)
                localStorage.setItem("phone-number", data.phoneNumber)
                localStorage.setItem("is-admin", data.isAdmin)
                addToast(data.msgs, {appearance: 'success', autoDismiss: true})
                props.history.push("/")
            })
            .catch(err => addToast(err.response.data.msgs, {appearance: 'error', autoDismiss: true}))
    }

    return (
        <Login onSubmit={onSubmit} title="Admin Login Page"/>
    )
}
export default AdminLogin