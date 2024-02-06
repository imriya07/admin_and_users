import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

function UserDetail() {
    const[users, setUsers] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() =>{
        axios.get('http://localhost:8080/users/detail/'+id)
        .then(result => {
            setUsers(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        axios.get('http://localhost:8080/users/logout')
        .then(result =>{
            if(result.data.Status){
                localStorage.removeItem("valid")
                navigate('/')
            }
        })
    }
    const handleEdit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/users/edit_users/' + id, users)
        .then(result => {
            if(result.data.Status){
                navigate('/edituserone')
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
  return (
    <div className='container-fluid'>
            <div className='row flex-nowrap'>
                <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                        <Link to="/dashboard" className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                            <span className='fs-5 fw-bolder d-none d-sm-inline hyperverge'>Hyperverge</span>
                        </Link>
                        <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                            {/* <li className='w-100'>
                                <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                                    <i className='fs-4 bi-speedometer2 ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                                </Link>
                            </li> */}
                            <li className='w-100'>
                                <Link to={'/usersdetail/'+id } className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-people ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Users</span>
                                </Link>
                            </li>
                            {/* <li className='w-100'>
                                <Link to="/dashboard/category" className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-columns ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Category</span>
                                </Link>
                            </li> */}
                            {/* <li className='w-100'>
                                <Link to="/dashboard/profile" className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-person ms-2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Profile</span>
                                </Link>
                            </li> */}
                            <li className='w-100' onClick={handleLogout}>
                                <Link className='nav-link px-0 align-middle text-white'>
                                    <i className='fs-4 bi-power ms-2'></i>
                                <span className='ms-2 d-none d-sm-inline'>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className='col p-0 m-0'>
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>User Management System</h4>
                    </div>
                    <Outlet />
                </div> */}
                <div className='row'>
                    <div className='col-md-1'></div>
                <div className='abc col-md-6'>
                    <h4 className='mt-3 user_profile'>User Profile</h4>
                    <img className='img-fluid image_user mt-3' src={`http://localhost:8080/Images/`+users.image} alt="" />
                    <div className='user_name mt-3'>
                    <h3>Name: {users.name}</h3>
                    <h3>Email: {users.email}</h3>
                    <h3>Address: {users.address}</h3>
                    {/* <h3>Phone: {users.phone}</h3> */}
                </div>
                <Link to={'/edituserform/' + users.id}><button className='btn btn-warning btn-sm me-2'>Edit</button></Link>
                {/* <button className='btn btn-danger'>Logout</button> */}
                </div>
                <div className='col-md-3'></div>
                </div>
            </div>
        </div>
  )
}

export default UserDetail