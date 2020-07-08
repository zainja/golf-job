import React,{useState} from "react";
import {withRouter} from 'react-router-dom'
const Note = (props) => {
    console.log(props)
    const {title, body, client, trainer, published, video_path} = props.history.location.state.noteInfo
    console.log(video_path)
    const formattedTime = new Intl.DateTimeFormat('en-GB').format(new Date(published))
    return(
        <div>
            <video>
                <source src={"file://"+video_path} type="video/mp4"/>
            </video>
            <div className="text-center mb-1 bg-dark p-3">
                <h3 className="display-4 text-white">{title}</h3>
            </div>
            <div className="note-general-info p-2">
                <h6 className="text-muted">At: {formattedTime}</h6>
                <h6 className="text-dark">From: {trainer}</h6>
            </div>
            <article className="pl-2 pr-2">
                {body}
            </article>
        </div>
    )
}
export default withRouter(Note)