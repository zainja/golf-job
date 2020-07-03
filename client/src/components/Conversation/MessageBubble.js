import React from "react";

const MessageBubble = (props) => {
    const dateObj = new Date(props.time)
    const today = new Date()
    let time = dateObj.getHours() + ":"  + dateObj.getMinutes()
    const style = props.isUser ? "order-last bg-primary" : "order-first bg-light"
    const textColor = props.isUser ? "text-white float-right" : "text-black float-left"
    const timeStyle = props.isUser ? "float-left text-white-50" : "float-right text-black-50"

    return (

        <div className="row mt-2">
            <div className="col-7"/>
            <div className={`col ${style} pt-2 rounded`}>
                <h6 className={textColor}>{props.text}</h6>
                <small className={timeStyle}>{time}</small>
            </div>
        </div>
    )
}
export default MessageBubble