import React from "react";

const Register = () => {

    return(
        <div>
            <div className="container-fluid jumbotron text-center">
                <h1 className="cm-header-2"> Register Page</h1>
            </div>
            <form className="container-fluid">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName"> First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName"> Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber"> Phone number </label>
                    <input type="tel" className="form-control" id="phoneNumber" placeholder="02932-2929323"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"/>
                </div>

                <div className="form-group">
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input type="password" className="form-control" id="repeatPassword" placeholder="Repeat Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Register