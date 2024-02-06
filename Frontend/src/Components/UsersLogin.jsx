import React, { useState } from 'react';
import './style.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
function UsersLogin() {
    const[values,setValues] = useState({
        email:'',
        password:''
    })
    const[error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) =>{
        event.preventDefault()
        axios.post('http://localhost:8080/users/userslogin',values)
        .then(result => {
            if(result.data.loginStatus){
                localStorage.setItem("valid",true)
                navigate('/usersdetail/'+result.data.id)
            }
            else{
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center loginpage'>
            <div className='d-flex flex-column justify-content-center align-items-center p-3 rounded border loginForm'>
            <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name='email' onChange={(e)=> setValues({...values,email : e.target.value})} autoComplete='off' placeholder='Enter Email' className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="password" name='password' onChange={(e)=> setValues({...values,password : e.target.value})} autoComplete='off' placeholder='Enter Password' className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-3 mb-2'>Login</button>
                    <Link to="/register" className='btn btn-secondary  w-100 rounded-2 mb-2'>Create Account</Link>
                </form>
            </div>
        </div>
  )
}

export default UsersLogin