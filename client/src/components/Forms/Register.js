import React, {useState} from "react";
import axios from "axios";
import {useToasts } from 'react-toast-notifications'
const Register = (props) => {
    const {addToast} = useToasts()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")

    const onSubmit = (e) =>{
        e.preventDefault()
        if (password !== confirmPassword){
            addToast("passwords don't match", {appearance: "error", PlacementType: 'top-center'})
        }else {
            props.onSubmit(email, firstName, lastName, phone, password)
        }
    }
    return(
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1 className="cm-header-2"> Register Page</h1>
            </div>
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group">
                    <h1 className="danger" id="errors"/>
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           value={email}
                           onChange={event => setEmail(event.target.value)}
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName"> First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName"> Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber"> Phone number </label>
                    <input type="tel"
                           className="form-control"
                           id="phoneNumber"
                           value={phone}
                           onChange={event => setPhone(event.target.value)}
                           placeholder="02932-2929323"
                           required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                           required
                           placeholder="Password"/>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           value={confirmPassword}
                           onChange={event => setConfirmPassword(event.target.value)}
                           required
                           placeholder="Repeat Password"/>
                   <small id="belowConfirm"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Register