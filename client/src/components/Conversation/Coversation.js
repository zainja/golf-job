import React, {useEffect, useState} from "react"
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {useInterval} from '../../hooks/useInterval'
import MessageBubble from "./MessageBubble";

const Conversation = (props) => {
    let messagesDiv = document.getElementById("messages");
    const [receivedMessages, setReceivedMessages] = useState([])
    const [message, setMessage] = useState("")
    const [messageLength, setMessageLength] = useState(0)
    const [scroll, setScroll] = useState(false)
    const send = () => {
        if (message !== "") {
            axios.post('/messages/sendMessage', {
                receiver: props.email,
                message: message
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            }).then(res => res.data)
                .catch(err => console.log(err.response.data))
        }
        messagesArray.push(<MessageBubble key={122}
                                          sender={localStorage.getItem("email")}
                                          text={message}
                                          isUser={true}
                                          time={Date.now()}
        />)
        messagesDiv.scrollTop = messagesDiv.scrollHeight
        setMessage("")
    }
    useInterval(() => {
        axios.post('/messages/getMessages/', {user: props.email}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(r => r.data)
            .then(data => {
                setReceivedMessages(data.messages)
            })
            .catch(err => console.log(err.response.data))
    }, 100)
    let messagesArray = receivedMessages.map(text => <MessageBubble key={text.id}
                                                                    sender={text.sender}
                                                                    text={text.message}
                                                                    isUser={localStorage.getItem("email") === text.sender}
                                                                    time={text.time}/>)
    return (
        <div>
            <div id="messages" className="chat-container mt-1 ml-1">
                {messagesArray}
            </div>
            <div className="send-text">
                <input type="text"
                       className="flex-grow-1 mr-1"
                       value={message}
                       onChange={event => (setMessage(event.target.value))}/>
                <button className="btn bg-primary text-white" onClick={send}>Send</button>
            </div>
        </div>
    )
}

export default withRouter(Conversation)