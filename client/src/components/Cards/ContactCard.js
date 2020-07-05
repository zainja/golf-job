import React from "react";

const ContactCard = (props) => {
    const {first_name, last_name, email, phone_number} = props.contact
    return (
        <div className="card contact">
            <div className="card-body" onClick={props.onClick}>
                <h5 className="card-title">{first_name + last_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{phone_number}</h6>
            </div>
        </div>
    )
}
export default ContactCard