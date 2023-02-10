import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from "../../axios-client";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    } 
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        //TODO show notification
        setLoading(true);
        getUsers();

      })
  }

  const getUsers = () => {
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
        console.log(data);
      })
      .catch(() => {
        setLoading(false)
      })
  }
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link to="/users/new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Created Date</td>
              <td>Actions</td>
            </tr>
          </thead>
          
          {loading && 
            <tbody>
              <tr>
                <td colSpan="5" className='text-center'>
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          
          {!loading &&
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Link to={'/users/' + user.id} className="btn btn-edit">Edit</Link>
                    &nbsp;
                    <button onClick={(ev) => onDelete(user)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default Users