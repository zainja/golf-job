import React, {useState} from "react";
import axios from "axios"
import {useInterval} from "../../hooks/useInterval";

const ConversationCard = (props) => {
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    }
    const {first_name, last_name, email} = props.contact
    const [lastMessage, setLastMessage] = useState("")
    const [time, setTime] = useState(new Date())
    const [isUser, setIsUser] = useState(false)
    const setEmail = () => {
        props.click(email, first_name, last_name)
    }
    useInterval(() => {
        axios.post("/messages/lastMessage", {otherUser: email}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(result => result.data)
            .then(data => {
                let message = data.message[0].message
                if (message.length > 50) {
                    message = message.substring(0, 50) + "..."
                }
                setLastMessage(message)

                setTime(new Intl.DateTimeFormat('en-GB', options).format(new Date(data.message[0].time)))
                setIsUser(data.isUser)
            }).catch(err => setLastMessage(err.response.data.msgs))
    }, 1000)
    const sender = isUser ? "You" : first_name
    return (
        <div className="card contact"
             id={props.id}
             onClick={setEmail}>
            <div className="card-body">
                <h5 className="card-title">{first_name + " " + last_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{sender + ": " + lastMessage}</h6>
                <h6 className="card-subtitle mb-2 text-muted">
                    {`in: ${time}`}
                </h6>
            </div>
        </div>
    )
}
export default ConversationCard