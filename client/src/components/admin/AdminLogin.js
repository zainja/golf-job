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
                localStorage.setItem("admin-token", data.adminAccessToken)
                addToast(data.msgs, {appearance: 'success', autoDismiss: true})
                props.history.push("/admin/main")
            })
            .catch(err => addToast(err.response.data.msgs, {appearance: 'error', autoDismiss: true}))
    }

    return (
        <Login onSubmit={onSubmit} title="Admin Login Page"/>
    )
}
export default AdminLogin