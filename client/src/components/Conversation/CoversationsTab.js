import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom"
import axios from 'axios'
import ConversationCard from "../Cards/CoversationCard";
import UserNavBar from "../navigation/NavigationBar";
import Conversation from "./Coversation";
import $ from "jquery"
const ConversationTab = () => {
    const [contacts, setContacts] = useState([])
    const [email, setEmail] = useState("")
    const onClick = (email) => {
        setEmail(email)
    }
    useEffect(() => {
        axios.get("/messages/allUsersTalkedTo/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(result => result.data)
            .then(data => {
                setContacts(data.users)
                setEmail(data.users[0].email)
            })
    }, [])
    const contactsArray = contacts.map(contact => <ConversationCard
        key={contact.email}
        id={contact.email}
        contact={contact}
        click={onClick}/>)
    return (
        <div>
            <UserNavBar/>

            <div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col-auto d-md-block d-lg-block d-xl-block d-none">
                        {contactsArray}
                    </div>
                    <div className="col">
                        <Conversation email={email}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(ConversationTab)