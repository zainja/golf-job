import React,{useState} from "react";
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom';
import AdminNavBar from "./AdminNavBar";

const AdminMainPage = (props) => {
    return(
        <div>
            <AdminNavBar/>
        </div>)
}
export default withRouter(AdminMainPage)