import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Users() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('https://admin-and-users.vercel.app/auth/users')
            .then(result => {
                if (result.data.Status) {
                    setUsers(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])
    const handleDelete = (id) => {
        axios.delete('https://admin-and-users.vercel.app/auth/delete_users/' + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                } else { 
                    alert(result.data.Error)
                }
            })
    }
    return (
        <div className='px-5 mt-3 user_li'>
            <div className='d-flex justify-content-center'>
                <h3 className='ab_user mt-3'>Users List</h3>
            </div>
            <Link to="/dashboard/add_users" className='btn btn-success'>Add Users</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Profile Pic</th>
                            <th>Email</th>
                            <th>Address</th>
                            {/* <th>Phone</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(e => (
                                <tr>
                                    <td>{e.name}</td>
                                    <td><img src={`https://admin-and-users.vercel.app/Images/` + e.image} className='users_image' /></td>
                                    <td>{e.email}</td>
                                    <td>{e.address}</td>
                                    {/* <td>{e.phone}</td> */}
                                    <td>
                                        <Link to={`/dashboard/edit_users/` + e.id}><button className='btn btn-warning btn-sm me-2'>Edit</button></Link>
                                        <button className='btn btn-danger btn-sm' onClick={() => handleDelete(e.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users