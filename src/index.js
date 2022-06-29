import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';


class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      userId: ''
    };
    this.deleteAUser = this.deleteAUser.bind(this);
    this.createAUser = this.createAUser.bind(this)

  }
  async componentDidMount(){
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get('/api/users');
      this.setState({ users: response.data });
      window.addEventListener('hashchange', ()=> {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      });
    }
    catch(ex){
      console.log(ex);
    }

  }

  
async deleteAUser(user) {
   const userIdentifier = user.id
   await axios.delete(`/api/users/${userIdentifier}`)
   let users = this.state.users.filter(user => user.id !== userIdentifier)
   this.setState({ users})
   window.location.hash = '#';
  }


async createAUser() {
   await axios.post(`/api/users`)
  const response = await axios.get('/api/users');
  this.setState({users: response.data})
}

 


  render(){
    const { users, userId } = this.state;
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>
          <Users users = { users } userId={ userId } deleteAUser={this.deleteAUser} createAUser={this.createAUser} /> 
          {
            userId ? <User userId={ userId }  /> : null
          }
        </main>
      </div>
    );
  }
}

const root = document.querySelector('#root');
render(<App />, root);


