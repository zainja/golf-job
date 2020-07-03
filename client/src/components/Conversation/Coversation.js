import React, {useState} from "react"
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {useInterval} from '../../hooks/useInterval'
import MessageBubble from "./MessageBubble";
const Conversation = (props) => {
    const [receivedMessages, setReceivedMessages] = useState([])
    const [message, setMessage] = useState("")
    const send = () => {
        if (message !== "") {
            axios.post('/messages/sendMessage', {
                receiver: props.match.params.email,
                message: message
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            }).then(res => res.data)
                .catch(err => console.log(err.response.data))
        }
    }
    useInterval(() => {
        axios.post('/messages/getMessages/', {user: props.match.params.email}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(r => r.data)
            .then(data => setReceivedMessages(data.messages))
            .catch(err => console.log(err.response.data))
    }, 1000)
    const messagesArray = receivedMessages.map(text => <MessageBubble key={text.id}
                                                                      sender={text.sender}
                                                                      text={text.message}
                                                                      isUser={localStorage.getItem("email") === text.sender}
                                                                      time={text.time}/>)
    return (
        <div style={{height: '100%'}}>
            <div className="container">
                    {messagesArray}
            </div>
            <div className="container fixed-bottom form-group w-100">
                <div className="row">
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={send}>Send</button>
                    </div>
                    <div className="col-md-10">
                        <input onChange={event => setMessage(event.target.value)} maxLength={250} required/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Conversation)