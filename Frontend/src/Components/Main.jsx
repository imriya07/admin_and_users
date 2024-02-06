import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Main() {
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:8080/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate('/dashboard')
          }
          else {
            navigate('/usersdetail/' + result.data.id)
          }
        }
      }).catch(err => console.log(err))
  }, [])
  return (
    <div>
      <div className='d-flex flex-column justify-content-center align-items-center loginpage'>
      <img className='hyp img-fluid' src="./Images/main.png" alt="" />
        <div className='d-flex flex-column justify-content-center align-items-center p-3 rounded border loginForm'>
          <h2>Login As</h2>
          <div className='d-flex judtify-content-between mt-5 mb-2'>
            <button type='button' className='btn btn-primary me-5' onClick={() => { navigate('/userslogin') }}>Users</button>
            <button type='button' className='btn btn-success' onClick={() => { navigate('/adminlogin') }}>Admin</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main