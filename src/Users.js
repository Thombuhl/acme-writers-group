import React from 'react';

const handleClick = (event, param) => {
  if (event) {
    return param
  }
}


const Users = ({ users, userId, deleteAUser, createAUser })=> {
  return (
    <ul>
      <li className={ !userId ? 'selected': ''}>
        <a href='#'>Users</a> <button id="add-user" onClick={event => handleClick(event, createAUser())}>Add User</button>

      </li>
      {
        users.map( user => {
          return (
            <li id="names" className={ user.id === userId*1 ? 'selected': ''} key={ user.id }>
              <a href={`#${user.id}`}>
                { user.name }
              </a> <button id="rm-user" onClick={event => handleClick(event, deleteAUser(user))}>Delete User</button>  </li> 
          );
        })
      }
    </ul>
  );
}

export default Users;


