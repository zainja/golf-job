import {Link} from "react-router-dom";
import React, {useState} from "react";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()
        props.onSubmit(email, password)
    }
    return (
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1 className="h1"> Login Page</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-8">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email"
                                       className="form-control"
                                       id="email"
                                       value={email}
                                       onChange={event => setEmail(event.target.value)}
                                       aria-describedby="emailHelp"
                                       required
                                       placeholder="Enter email"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    className="form-control"
                                    id="password"
                                    required
                                    placeholder="Password"
                                />
                            </div>
                            <Link to="/forgot-password">
                                <small> forgot your password ?</small>
                            </Link>
                            <br/>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                    <div className="col-md-2"/>
                </div>
            </div>
        </div>
    )
}
export default Login