import React,{useState, useEffect} from "react";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")

    const handleChange = (e) => {
        const {id, value} = e.target
        switch (id) {
            case "email": setEmail(value)
                break
            case "password": setPassword(value)
                break
            case "confirmPassword":
                setConfirmPassword(value)
                if (password !== value)
                    document.getElementById("belowConfirm").innerText = "passwords don't match"
                else {
                    document.getElementById("belowConfirm").innerText = ""
                }
                break
            case "firstName": setFirstName(value)
                break
            case "lastName": setLastName(value)
                break
            case "phoneNumber": setPhone(value)
        }
    }
    const onSubmit = (e) =>{
        e.preventDefault()

        if (password === confirmPassword){
            alert("Submitted")
        }
    }
    return(
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1 className="cm-header-2"> Register Page</h1>
            </div>
            <form className="container-fluid" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           value={email}
                           onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                           onChange={handleChange}
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
                           onChange={handleChange}
                           required
                           placeholder="Password"/>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           value={confirmPassword}
                           onChange={handleChange}
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