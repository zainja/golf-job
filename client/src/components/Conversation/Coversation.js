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
        <div className="container-fluid">
            <div className="row mb-2" style={{height: "2rem"}}>
                <div className="container-fluid bg-dark">
                    <div className="container text-center">
                        <h3 className="text-white">Conversation</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="container overflow-auto"
                     style={{maxHeight: `calc(100vh - 6rem)`, "overflow-y": "scroll"}}>
                    {messagesArray}
                </div>
            </div>
            <div className="row mt-2">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <div className="form-group">
                                <input className="w-100" onChange={event => setMessage(event.target.value)}
                                       maxLength={250}
                                       required/>
                            </div>
                        </div>
                        <div className="col-2" style={{height: "2rem"}}>
                            <button className="btn btn-primary" onClick={send}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Conversation)