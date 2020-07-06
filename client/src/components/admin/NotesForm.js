import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom"
import NavigationBar from "../navigation/NavigationBar";
import axios from "axios";
const NotesForm = () => {
    const [trainers, setTrainers] = useState([])

    useEffect(() => {
        axios.get('/admin/users/All', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access-token")}`
            }
        }).then(response => response.data)
            .then(data => setTrainers(data.users))
    }, [])
    const onSubmit = () => {

    }
    console.log(trainers)
    const trainersList = trainers.map(trainer => {
        return(
            <option key={trainer.email} className="dropdown-item">
                {trainer.first_name + " " + trainer.last_name}
            </option>
        )
    })
    return (
        <div>
            <NavigationBar/>
            <div className="container-fluid jumbotron text-center bg-dark justify-content-center">
                <h3 className="display-4 text-white">Write notes for client</h3>
            </div>
            <form className="container mt-5 flex-column">
                <div className="form-group">
                    <input className="form-control form-control-lg"
                           type="text"
                           placeholder="Subject"/>
                </div>
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Client</span>
                    </div>
                    <select className="form-control" id="list-users">
                        {trainersList}
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="labels"/>
                </div>
                 <div className="form-group">
                    <textarea className="form-control" placeholder="Notes for the user"/>
                </div>
                <div className="form-group">
                    <div className="custom-file">
                        <label className="custom-file-label" htmlFor="customFile">Upload video</label>
                        <input type="file" className="custom-file-input" id="customFile"/>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default withRouter(NotesForm)