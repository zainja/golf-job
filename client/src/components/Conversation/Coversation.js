import React, {useEffect, useState, useRef} from "react"
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {useInterval} from '../../hooks/useInterval'
import MessageBubble from "./MessageBubble";

const Conversation = (props) => {
    const [receivedMessages, setReceivedMessages] = useState([])
    const [message, setMessage] = useState("")
    const messagesEndRef = useRef(null)
    const[length, setLength] = useState(0)
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
                                          time={Date.now()}/>)

        setMessage("")
    }
    useInterval(() => {
        axios.post('/messages/getMessages/', {user: props.email}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(r => r.data)
            .then(data => {
                if (data.messages.length !== receivedMessages.length)
                    setReceivedMessages(data.messages)
            })
            .catch(err => console.log(err.response.data))
    }, 100)

    const scrollToBottom = () => {

        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [receivedMessages]);

    let messagesArray = receivedMessages.map(text => <MessageBubble key={text.id}
                                                                    sender={text.sender}
                                                                    text={text.message}
                                                                    isUser={localStorage.getItem("email") === text.sender}
                                                                    time={text.time}/>)

    return (
        <div>
            <div id="messages" className="chat-container mt-1 ml-1">
                {messagesArray}
                <div ref={messagesEndRef}/>
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