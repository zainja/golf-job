import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useToasts} from 'react-toast-notifications'
import axios from 'axios'
import NotesCard from "../Cards/NotesCard";
const AllNotes = (props) => {
    const isAdmin = localStorage.getItem('is-admin')

    const route = isAdmin ? "admin" : "user"
    const {addToast} = useToasts()
    const [notesList, setNotesList] = useState([])
    const getAllArticles = () => {
        axios.get(`/notes/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(result => result.data)
            .then(data => setNotesList(data.posts))
            .catch(err => addToast("Fetch error", {appearance: 'error'}))
    }
    const popupNote = () => {

    }
    console.log(notesList)
    const NotesCardList = notesList.map(note => {
        return (
            <NotesCard key={note.id} notes={note} onClick={popupNote}/>

        )
    })

    useEffect(() => {
        getAllArticles()
    }, [])

    return (
        <div>
            {NotesCardList}
        </div>
    )
}
export default withRouter(AllNotes)