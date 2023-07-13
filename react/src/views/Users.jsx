import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from "../../axios-client";
import { useStateContext } from '../contexts/ContextProvider';

const Users = () => {
  const {setNotification} = useStateContext();
  
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
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
        setNotification("User was successfully deleted")
        setLoading(true);
        getUsers();

      })
  }

  const getUsers = (url = '/users') => {
    setLoading(true)
    axiosClient.get(url)
      .then(({ data }) => {
        setLoading(false)
        setLinks(data.links)
        setUsers(data.data)
        console.log(data);
        console.log(links);
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
                <tr key={user.id}>
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

      &nbsp;

      <div>
        {links.prev == null
        ? <button onClick={() => getUsers(links.prev)} className='btn' style={{ opacity: '50%' }} disabled>Prev</button>
        : <button onClick={() => getUsers(links.prev)} className='btn'>Prev</button>
        }
        
        &nbsp;

        {links.next == null
        ? <button onClick={() => getUsers(links.next)} className='btn' style={{ opacity: '50%' }} disabled>Next</button>
        : <button onClick={() => getUsers(links.next)} className='btn'>Next</button>
        }
      </div>
    </div>
  )
}

export default Users