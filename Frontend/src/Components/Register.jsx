import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddUsers() {
    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        category_id: '',
        image: ''
    })
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8080/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', users.name);
        formData.append('email', users.email);
        formData.append('password', users.password);
        formData.append('address', users.address);
        formData.append('phone', users.phone);
        formData.append('image', users.image);
        formData.append('category_id', users.category_id);
        axios.post('http://localhost:8080/auth/add_users', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/userslogin')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-3 regis_ter'>
            <div className='p-3 rounded w-50 border'>
            <h2 className='text-center'>Register</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" onChange={(e) => setUsers({ ...users, name: e.target.value })} placeholder='Enter Name' className='form-control rounded-0' id='inputName' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className='form-label'>Email</label>
                        <input type="email" onChange={(e) => setUsers({ ...users, email: e.target.value })} className='form-control rounded-0' id='inputEmail4' placeholder='Enter Email' autoComplete='off' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputPassword4" className='form-label'>Password</label>
                        <input type="password" onChange={(e) => setUsers({ ...users, password: e.target.value })} className='form-control rounded-0' id='inputPassword4' placeholder='Enter Password' />
                        <label htmlFor="inputPhone" className='form-label'>Phone</label>
                        <input type="text" onChange={(e) => setUsers({ ...users, phone: e.target.value })} className='form-control rounded-0' id='inputPhone' placeholder='Enter Phone' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputAddress" className='form-label'>Address</label>
                        <input type="text" onChange={(e) => setUsers({ ...users, address: e.target.value })} className='form-control rounded-0' id='inputAddress' placeholder='Enter Address' autoComplete='off' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="category" className='form-label'>Category</label>
                        <select name="category" onChange={(e) => setUsers({ ...users, category_id: e.target.value })} id="category" className='form-select'>
                            {category.map(c => {
                                return <option value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12 mb-3'>
                        <label htmlFor="inputGroupFile01" className='form-label'>Profile Pic</label>
                        <input type="file" onChange={(e) => setUsers({ ...users, image: e.target.files[0] })} className='form-control rounded-0' id='inputGroupFile01' name='image' />
                    </div>
                    <div className='col-12 mb-3'>
                        <button type='submit' className='btn btn-success w-100'>Register</button>
                    </div>
                    <div className='col-12 mb-3'>
                        <Link type='submit' to="/userslogin" className='btn btn-primary w-100'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUsers