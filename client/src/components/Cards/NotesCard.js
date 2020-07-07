import React from "react";

const NotesCard = (props) => {
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    }
    const {title, body, published} = props.notes
    const date = new Date(published)
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date)
    return (
        <div className="card contact">
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {body}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                    {formattedDate}
                </h6>
            </div>
        </div>
    )
}
export default NotesCard