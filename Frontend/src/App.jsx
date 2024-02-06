import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Users from './Components/Users'
import Category from './Components/Category'
// import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddUsers from './Components/AddUsers'
import EditUsers from './Components/EditUsers'
import Main from './Components/Main'
import UsersLogin from './Components/UsersLogin'
import UserDetail from './Components/UserDetail'
import { useEffect } from 'react'
import axios from 'axios'
import PrivateRoute from './Components/PrivateRoute'
import EditUserform from './Components/EditUserform'
import Register from './Components/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/edituserform/:id' element={<EditUserform />}></Route>
          <Route path='register' element={<Register/>}></Route>
          <Route path='/userslogin' element={<UsersLogin />}></Route>
          <Route path='/usersdetail/:id' element={<UserDetail />}></Route>
          <Route path='/adminlogin' element={<Login />}></Route>
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path='' element={<Home />}></Route>
            <Route path='/dashboard/users' element={<Users />}></Route>
            <Route path='/dashboard/category' element={<Category />}></Route>
            {/* <Route path='/dashboard/profile' element={<Profile />}></Route> */}
            <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
            <Route path='/dashboard/add_users' element={<AddUsers />}></Route>
            <Route path='/dashboard/edit_users/:id' element={<EditUsers />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
