import React, {useEffect} from "react";
import axios from "axios";
import axiosInstance from "../../handlingTokens/authIntreceptor";
const ConfirmEmail = (props) => {
    console.log(localStorage.getItem("access-token"))
    useEffect(() => {
        axiosInstance.put('/auth/validate', {},{
        headers: {
        'Authorization': `Basic ${localStorage.getItem("access-token")}`
        }
        }).then(r => r.data)
            .then(data => {
            })
            .catch(err => {
                console.log(err)
                if (err.status === 401){
                    props.history.push("/login")
                }
            })
    },[])
    return (
        <h1> Email Has been confirmed</h1>
    )
}
export default ConfirmEmail