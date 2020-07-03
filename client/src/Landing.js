import React,{useEffect, useState} from "react";
import {withRouter} from 'react-router-dom';
import UserNavBar from "./components/navigation/NavigationBar";
import axios from 'axios';
import Conversation from "./components/Conversation/Coversation";
import ContactCard from "./components/Cards/ContactCard";
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
        <div>
            <UserNavBar/>
            <div className="container mt-5">
                    <h3 className="text-muted"> Mentors</h3>
            </div>
            <div className="container">
                {listOfContacts}
            </div>
        </div>
    )
}
export default withRouter(Landing)