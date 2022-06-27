import React from 'react';

const handleClick = (event, param) => {
  if (event) {
    return param
  }
}

const Users = ({ users, userId, deleteAUser })=> {
  return (
    <ul>
      <li className={ !userId ? 'selected': ''}>
        <a href='#'>Users</a>
      </li>
      {
        users.map( user => {
          return (
            <li className={ user.id === userId*1 ? 'selected': ''} key={ user.id }>
              <a href={`#${user.id}`}>
                { user.name }
              </a> <button id="rm-user" onClick={event => handleClick(event, deleteAUser(user))}>X</button>
            </li> 
          );
        })
      }
    </ul>
  );
}

export default Users;


