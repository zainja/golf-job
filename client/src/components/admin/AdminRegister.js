import React,{useState} from "react";
import axios from "axios"
import {withRouter} from 'react-router-dom';
import Register from "../Forms/Register";


const AdminRegister = (props) => {

    const onSubmit = (email, firstName, lastName, phone, password) =>{
        const registerObj = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            phoneNumber: phone
        }
        axios.post("/admin/register",registerObj)
            .then(response => response.data)
            .then(data => {
                localStorage.setItem("register-token", data.registerToken)
                props.history.push("/confirm-sent", data.msgs)
            })
    }
    return(
        <Register onSubmit={onSubmit} title="Admin Register Page"/>
    )
}
export default withRouter(AdminRegister)