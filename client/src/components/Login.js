import React, {useState, useEffect} from "react";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleChange = (e) => {
        const {id, value} = e.target
        if (id === "email"){
            setEmail(value)
        }else if (id === "password"){
            setPassword(value)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        alert("form submitted")
    }
    return(
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1 className="h1"> Login Page</h1>
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