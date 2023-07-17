import { useState, useEffect } from "react";
/* import { Link } from "react-router-dom"; */

import *as API from '../services/user.service'

import Footer from "../components/Footer";
import NavBar from "../components/Navbar";


import { Table } from "react-bootstrap";
import './styles/Users.scss';

function Users() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        await API.getUsers().then((response) => {
            const usersFound = response?.data;
            setUsers(
                Object.keys(usersFound).map((uid) => {
                    return { id: uid, user: usersFound[uid] };
                })
            );
        })
    }

    useEffect(() => {
        document.title = "Users";
        getUsers();
    }, [])

    return (
        <>
            <NavBar />
            <main className="users-main">
                <h1>Users</h1>
                <section className="users-content">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Identification</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td > {index+1} </td>
                                                <td > {data.user?.identification} </td>
                                                <td > {data.user?.name} </td>
                                                <td > {data.user?.email} </td>
                                                <td > {data.user?.role} </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </section>
            </main>
            <Footer />
        </>
    )
}
export default Users;