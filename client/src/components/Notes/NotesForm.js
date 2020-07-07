import React, {useEffect, useState, useRef} from "react";
import {withRouter} from "react-router-dom"
import NavigationBar from "../navigation/NavigationBar";
import axios from "axios";
import {useToasts} from "react-toast-notifications"

const NotesForm = (props) => {
    const {addToast} = useToasts()
    const [fileName, setFileName] = useState("Choose a file")
    const [clients, setClients] = useState([])
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [targetClient, setTargetClient] = useState("")
    const [targetClientEMail, setTargetClientEmail] = useState("")
    const fileInput = useRef(null)
    console.log(targetClientEMail)
    useEffect(() => {
        axios.get('/admin/users/All', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access-token")}`
            }
        }).then(response => response.data)
            .then(data => {
                setTargetClientEmail(data.users[0].email)

                setClients(data.users)
            })
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", fileInput.current.files[0])
        data.append("title", title)
        data.append("note", note)
        data.append("targetClient", targetClientEMail)
        axios.post("/notes/upload", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        }).then(response => response.data)
            .then(data => addToast("Notes Submitted", {appearance: 'success', autoDismiss: true}))
            .catch(err => addToast("Submission Failed", {appearance: "error"}))
    }
    const clientList = clients.map(client => {
        return (
            <option key={client.email} id={client.email} className="dropdown-item">
                {client.first_name + " " + client.last_name}
            </option>
        )
    })
    return (
        <div>
            <NavigationBar/>
            <div className="container-fluid jumbotron text-center bg-dark justify-content-center">
                <h3 className="display-4 text-white">Write notes for client</h3>
            </div>
            <form className="container mt-5 flex-column" onSubmit={onSubmit}>
                <div className="form-group">
                    <input className="form-control form-control-lg"
                           type="text"
                           required
                           value={title}
                           onChange={event => setTitle(event.target.value)}
                           placeholder="Subject"/>
                </div>
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Client</span>
                    </div>
                    <select className="form-control"
                            id="list-users"
                            value={targetClient}
                            onChange={event => {
                                setTargetClient(event.target.value)
                                const index = event.target.selectedIndex;
                                const optionElement = event.target.childNodes[index]
                                const option = optionElement.getAttribute('id');
                                setTargetClientEmail(option)
                            }}>
                        {clientList}
                    </select>
                </div>
                <div className="form-group">
                    <textarea className="form-control"
                              value={note}
                              required
                              onChange={event => setNote(event.target.value)}
                              placeholder="Notes for the user"/>
                </div>
                <div className="form-group">
                    <div className="custom-file">
                        <label className="custom-file-label"
                               htmlFor="customFile">{fileName}</label>
                        <input type="file"
                               className="custom-file-input"
                               id="customFile"
                               required
                               accept="video/mp4"
                               onChange={event => setFileName(event.target.files[0].name)}
                               ref={fileInput}/>
                    </div>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default withRouter(NotesForm)