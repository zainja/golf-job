import React, {useState} from "react";
import axios from 'axios'
const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleChange = (e) => {
        const {id, value} = e.target
        if (id === "email"){
            setEmail(value)
        }else if (id === "password"){
            setPassword(value)
        }
    }
    const onSubmit = (e) => {
        axios.post('/auth/login', {
            email: email,
            password: password
        }) .then(r => r.data)
            .then(data => {
                localStorage.setItem("access-token", data.accessToken)
                localStorage.setItem("refresh-token", data.refreshToken)
                setErrorMessage("")
                props.history.push("/")

            })
            .catch(err => setErrorMessage(err.response.data.error))

    }
    return(
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1 className="h1"> Login Page</h1>
            </div>

            <form className="container" onSubmit={onSubmit}>
                <h1 className="alert-danger">{errorMessage}</h1>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           value={email}
                           onChange={handleChange}
                           aria-describedby="emailHelp"
                           required
                           placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handleChange}
                        className="form-control"
                        id="password"
                        required
                        placeholder="Password"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
)
}
export default Login