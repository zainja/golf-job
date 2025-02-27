import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom"
import axios from 'axios'
import ConversationCard from "../Cards/CoversationCard";
import UserNavBar from "../navigation/NavigationBar";
import Conversation from "./Coversation";
import $ from "jquery"
import {useToasts} from "react-toast-notifications";

const ConversationTab = (props) => {
    const {addToast} = useToasts()
    const [contacts, setContacts] = useState([])
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const onClick = (email, first_name, last_name) => {
        setEmail(email)
        setName(first_name + " " + last_name)
    }

    let classHighlight = 'highlight';
    let $thumbs = $('.thumbnail').click(function (e) {
        e.preventDefault();
        $thumbs.removeClass(classHighlight);
        $(this).addClass(classHighlight);
    });
    useEffect(() => {
        axios.get("/messages/allUsersTalkedTo/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(result => result.data)
            .then(data => {
                setContacts(data.users)
                setEmail(data.users[0].email)
                setName(data.users[0].first_name + " " + data.users[0].last_name)
            }).catch(err => addToast("Couldn't fetch data", {appearance: 'error', autoDismiss: true}))
    }, [])
    const contactsArray = contacts.map(contact => {
        let className = "thumbnail"
        if (contacts.indexOf(contact) === 0) {
            className += " highlight"
        }
        return (
            <li key={contact.email} className={className}>
                <ConversationCard
                    id={contact.email}
                    contact={contact}
                    click={onClick}/>
            </li>
        )
    })

    const contactsSmallScreen = contacts.map(contact => {
        return (
            <a className="dropdown-item" key={contact.email}
               onClick={e => onClick(contact.email, contact.first_name, contact.last_name)}>
                {contact.first_name}
            </a>
        )
    })
    const goBack = () => {
        props.history.push("/")
    }
    return (
        <div>
            <div className="d-md-block d-lg-block d-xl-block d-none">
                <UserNavBar/>
            </div>
            <div className="bg-light chat-upper-bar d-flex d-lg-none d-md-none">
                <button className="btn btn-warning" onClick={goBack}>
                    back
                </button>
                <h3>
                    {name}
                </h3>
                <div className="btn-group">
                    <button type="button"
                            className="btn btn-info dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">Contacts
                    </button>
                    <div className="dropdown-menu">
                        {contactsSmallScreen}
                    </div>

                </div>
            </div>


            <div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col-auto d-md-block d-lg-block d-xl-block d-none mt-1">
                        <ul className="cards">
                            {contactsArray}
                        </ul>
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