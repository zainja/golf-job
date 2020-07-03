import React from "react";
import {Link} from "react-router-dom";

const ContactCard = (props) => {
    const {first_name, last_name, email, phone_number} = props.contact
    return (
        <Link to={`/conversation/${email}`}>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body" onClick={props.onClick}>
                    <h5 className="card-title">{first_name + last_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{phone_number}</h6>
                </div>
            </div>
        </Link>
    )
}
export default ContactCard