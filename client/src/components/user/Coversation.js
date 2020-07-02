import React, {useState} from "react"
import axios from 'axios'
import useInterval from '../../hooks/useInterval'
const Conversation = (props) => {
    const [messages, setMessages] = useState("")
    useInterval(() => {
        axios.get('/messages/get', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(r => r.data)
            .then(data => setMessages(data.messages))
    }, 3000)
    console.log(messages)
    return (
        <div>
            hello
        </div>
    )
}

export default Conversation