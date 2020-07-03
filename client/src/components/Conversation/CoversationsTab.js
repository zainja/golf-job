import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom"
import axios from 'axios'
import ConversationCard from "../Cards/CoversationCard";
import UserNavBar from "../user/UserNavBar";

const ConversationTab = () => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        axios.get("/messages/allUsersTalkedTo/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(result => result.data)
            .then(data => {
                setContacts(data.users)
            })
    }, [])
    console.log(contacts)
    const contactsArray = contacts.map(contact => <ConversationCard key={contact.email} contact={contact}/>)
    return (
        <div>
            <UserNavBar/>
            <div className="container mt-5">
                <h3 className="text-muted align-center">People you talked to</h3>
            </div>
            <div className="container">
                {contactsArray}
            </div>
        </div>
    )
}
export default withRouter(ConversationTab)