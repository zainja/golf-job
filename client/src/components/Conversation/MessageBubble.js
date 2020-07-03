import React from "react";

const MessageBubble = (props) => {
    const dateObj = new Date(props.time)
    const today = new Date()
    let time = dateObj.getHours() + ":"  + dateObj.getMinutes()
    const style = props.isUser ? "order-last bg-primary text-right" : "order-first bg-light text-left"
    const textColor = props.isUser ? "text-white" : "text-black"

    return (

        <div className="row mt-2">
            <div className="col-md-10"/>
            <div className={`col-md-2 ${style} pt-2 rounded`}>
                <h6 className={textColor}>{props.text}</h6>
                <small className={textColor}>{time}</small>
            </div>
        </div>
    )
}
export default MessageBubble