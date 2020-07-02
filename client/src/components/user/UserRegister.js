import React, {useState, useEffect} from "react";
import axios from 'axios'
import Register from "../Forms/Register";
import {useToasts } from 'react-toast-notifications'

const UserRegister = (props) => {
    const { addToast } = useToasts()
    const onSubmit = (email, firstName, lastName, phone, password) => {

        const registerObj = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            phoneNumber: phone
        }
        axios.post(`/auth/register`, registerObj)
            .then(res => res.data)
            .then(data => {
                localStorage.setItem("register-token", data.registerToken)
                props.history.push("/confirm-sent", data.msgs)
            }).catch(err => {
            addToast(err.response.data.msgs,{appearance: 'error',autoDismiss: true})
        })
    }
    return (
        <Register onSubmit={onSubmit} title="Register Page"/>
    )
}
export default UserRegister