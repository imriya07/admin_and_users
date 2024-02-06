import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Home() {
  const [adminTotal, setAdminTotal] = useState(0)
  const [usersTotal, setusersTotal] = useState(0)
  // const [admins, setAdmins] = useState([])
  useEffect(() => {
    adminCount();
    usersCount();
    // AdminRecords();
  }, [])

  // const AdminRecords = () => {
  //   axios.get('http://localhost:8080/auth/admin_records')
  //     .then(result => {
  //       if (result.data.Status) {
  //         setAdmins(result.data.Result)
  //       } else{
  //         alert(result.data.Error)
  //       }
  //     })
  // }
  const adminCount = () => {
    axios.get('http://localhost:8080/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }
  const usersCount = () => {
    axios.get('http://localhost:8080/auth/users_count')
      .then(result => {
        if (result.data.Status) {
          setusersTotal(result.data.Result[0].users)
        }
      })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3 '>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center'>
            <h4 className='admin'>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center'>
            <h4 className='admin'>Users</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{usersTotal}</h5>
          </div>
        </div>
      </div>
      <div className='setting'>
        {/* <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => {
              <tr>
                <td>{a.email}</td>
                <td>
                  <button className='btn btn-warning btn-sm me-2'>Edit</button>
                  <button className='btn btn-danger btn-sm' >Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table> */}
      </div>
    </div>
  )
}

export default Home