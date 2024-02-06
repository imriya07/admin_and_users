import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditUsers() {
    const {id} = useParams()
    const [users, setUsers] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        category_id:'',
    });
    const[category, setCategory] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        axios.get('http://localhost:8080/auth/category')
        .then(result =>{
            if(result.data.Status){
                setCategory(result.data.Result)
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
        axios.get('http://localhost:8080/auth/users/' + id)
        .then(result =>{
            setUsers({
                ...users,
                name: result.data.Result[0].name,
                email:result.data.Result[0].email, 
                address:result.data.Result[0].address,
                phone:result.data.Result[0].phone,
                category_id:result.data.Result[0].category_id,
            })
        }).catch(err => console.log(err))
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/auth/edit_users/' + id, users)
        .then(result => {
            if(result.data.Status){
                navigate('/usersdetail/' +id)
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
  return (
    <div>
        <div className='d-flex justify-content-center align-items-center mt-3 riya'>
            <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Edit Users</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" value={users.name} onChange={(e) => setUsers({...users, name: e.target.value})} placeholder='Enter Name' className='form-control rounded-0' id='inputName' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className='form-label'>Email</label>
                        <input type="email" value={users.email} onChange={(e) => setUsers({...users, email: e.target.value})} className='form-control rounded-0' id='inputEmail4' placeholder='Enter Email' autoComplete='off' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputAddress" className='form-label'>Address</label>
                        <input type="text" value={users.address} onChange={(e) => setUsers({...users, address: e.target.value})} className='form-control rounded-0' id='inputAddress' placeholder='Enter Address' autoComplete='off' />
                        {/* <label htmlFor="inputPhone" className='form-label'>Phone</label>
                        <input type="text" value={users.phone} onChange={(e) => setUsers({...users, phone: e.target.value})} className='form-control rounded-0' id='inputPhone' placeholder='Enter Phone' /> */}
                    </div>
                    <div className='col-12'>
                        <label htmlFor="category" className='form-label'>Category</label>
                        <select name="category" onChange={(e) => setUsers({...users, category_id: e.target.value})} id="category" className='form-select'>
                            {category.map(c =>{
                                return <option value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12 mb-3'>
                        <button type='submit' className='btn btn-primary w-100'>Edit Users</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditUsers