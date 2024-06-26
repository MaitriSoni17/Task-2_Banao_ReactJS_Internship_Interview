import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import SampleUserImage from '../Imgs/SampleUserImg.jpg';
import Loader from "./Loader";

function UserData() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users').then(response => {
            setUsers(response.data)
            setLoader(false);
        })
            .catch(error => {
                console.error(error);
            })
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    }
    return (
        <>
            <div className="container my-5 bg-white p-5 rounded-5">
                <h1 className="text-center mb-5">Users</h1>
                {loader && <Loader />}
                <div className="row bg-white ps-3">
                    <div className="col-md-7 pe-5 bg-white">
                        {users.map((user, index) => (
                            <>
                                {!user ? <>
                                    <div className="text-center">
                                        <h1>No Data to Display</h1>
                                    </div>
                                </> :
                                    <>
                                        <div key={index} onClick={() => handleUserClick(user)} className="card bg-white mb-3 border-0">
                                            <div className="row g-0">
                                                <div className="col-md-2 p-3 rounded-circle">
                                                    {!user.avatar ? <img src={SampleUserImage} className="img-fluid rounded-circle" alt="" /> : <img src={user.avatar} className="img-fluid rounded-circle" alt="" />}
                                                </div>
                                                <div className="col-md-8 d-flex align-items-center">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{user.profile.firstName} {user.profile.lastName}</h5>
                                                        <p className="card-text">{user.jobTitle}</p>
                                                    </div>
                                                </div>
                                                <div className="col d-flex align-items-center justify-content-end">
                                                    <i className="bi bi-arrow-right-short fs-1 me-3"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                }</>
                        ))}
                    </div>
                    {selectedUser && (
                        <div className="col position-relative mt-5">
                            {loader && <Loader />}
                            <div className="border p-3 rounded-5 pb-5 shadow-lg">
                                {!selectedUser.avatar ? <img src={SampleUserImage} className="img-fluid rounded-circle position-absolute top-0 start-50 translate-middle shadow-lg" alt="" /> : <img src={selectedUser.avatar} className="img-fluid rounded-circle position-absolute top-0 start-50 translate-middle shadow-lg" alt="" />}
                                <h2 className="mt-5 pt-4 text-center mb-3">{selectedUser.profile.firstName} {selectedUser.profile.lastName}</h2>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th className="w-25 py-3">User Name</th>
                                            <td className="py-3">{selectedUser.profile.username}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-25 py-3">Job Title</th>
                                            <td className="py-3">{selectedUser.jobTitle}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-25 py-3">Bio</th>
                                            <td className="py-3">{selectedUser.Bio}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-25 py-3">Email</th>
                                            <td className="py-3">{selectedUser.profile.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserData;