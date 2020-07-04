import React from "react";

const MessageBubble = (props) => {
    const dateObj = new Date(props.time)
    const today = new Date()
    let time = dateObj.getHours() + ":" + dateObj.getMinutes()
    const style = props.isUser ? "message-user bg-primary" : "message-otheruser bg-light"
    const textColor = props.isUser ? "text-white" : "text-black"
    const timeStyle = props.isUser ? "text-white-50" : "text-black-50"

    return (
        <div className={`mb-2 ${style} p-2 rounded`}>
            <h6 className={textColor}>{props.text}</h6>
            <small className={timeStyle}>{time}</small>
        </div>

    )
}
export default MessageBubble