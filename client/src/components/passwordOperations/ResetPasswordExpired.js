import React from "react";
import {withRouter} from "react-router-dom"
import {Link} from "react-router-dom";

const ResetPasswordExpired = (props) => {
    document.body.style.backgroundColor = "#f8d7da";
    return (
            <div className="container-fluid jumbotron alert-danger text-center">
                <h1> Reset Password failed</h1>
                <p> The link used expired reset the password again</p>
                <Link to="/login">
                    <button
                        onClick={event => document.body.style.backgroundColor = "white"}
                        className="btn btn-primary"> Return to login</button>
                </Link>
            </div>
    )
}
export default ResetPasswordExpired