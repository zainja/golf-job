import React,{useEffect, useState} from "react";
import {withRouter} from 'react-router-dom';
import UserNavBar from "./UserNavBar";
import axios from 'axios';
import Conversation from "../Conversation/Coversation";
import ContactCard from "../contact/ContactCard";
const Landing = (props) => {
    console.log(props)
    const [trainers, setTrainers] = useState([])
    const logout = ()=> {
        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
        props.history.push("/login")
    }
    useEffect(() => {
        axios.get('/auth/AllMentors',{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("access-token")}`
        }}).then(response => response.data)
            .then(data => setTrainers(data.mentors))
    },[])

    let listOfContacts = trainers.map(contact => <ContactCard key={contact.email} contact={contact}/>)
    return(
        // <div className="container-fluid">
        //     <UserNavBar/>
        //     <h1>Main Page</h1>
        //     <Conversation user="zainjaffal@gmail.com"/>
        //     <div className="container">
        //         <h1> Mentors </h1>
        //         {listOfContacts}
        //     </div>
        // </div>
        <div>
            <UserNavBar/>

            <div className="container m-4">
                <div className="row">
                    <div className="col-md-2"/>
                    <h1> Mentors</h1>
                </div>
                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md">
                        {listOfContacts}
                    </div>
                    <div className="col-md-2"/>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Landing)