import React from "react";

const Landing = (props) => {
    const logout = ()=> {
        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
    }
    return(
        <div>
            <h1>Main Page</h1>
            <button className="btn btn-primary" onClick={logout}> Logout </button>

        </div>
    )
}
export default Landing