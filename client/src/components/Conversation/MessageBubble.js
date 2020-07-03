import React from "react";

const MessageBubble = (props) => {
    const dateObj = new Date(props.time)
    const today = new Date()
    let time = dateObj.getHours() + ":" + dateObj.getMinutes()
    const order = props.isUser ? "order-last": "order-first"
    const style = props.isUser ? "bg-primary mr-auto" : "bg-light ml-auto order-first"
    const textColor = props.isUser ? "text-white float-right" : "text-black float-left"
    const timeStyle = props.isUser ? "float-left text-white-50" : "float-right text-black-50"

    return (

        <div className="row mt-2">
            <div className="col-5"/>
            <div className={`col ${order}`}>
                <div className="row">
                    <div className="col"/>
                    <div className={`col-auto ${style} rounded p-2`}>
                        <h6 className={textColor}>{props.text}</h6>
                        <br/>
                        <small className={timeStyle}>{time}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MessageBubble