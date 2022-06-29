import React, { Component } from 'react';
import axios from 'axios';

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      users: [],
      stories: [] 
    };
    this.handleClick = this.handleClick.bind(this);
    this.deleteAStory = this.deleteAStory.bind(this);
    this.createAStory = this.createAStory.bind(this);
  }


   handleClick(event, param){
    if (event) {
      return param
    }
  }

  async createAStory(user) {
   const response = await axios.post(`/api/users/${user.id}/stories`)
   const stories = [...this.state.stories, response.data]

   this.setState({stories})

  }

  async deleteAStory(story) {
    const storyIdentifier = story.id
    await axios.delete(`/api/stories/${storyIdentifier}`)
    const stories = this.state.stories.filter(story => story.id !== storyIdentifier)
    this.setState({stories})
   }
  async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.userId}`);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });
    response = await axios.get(`/api/users`)
    this.setState({users: response.data})

  }
  async componentDidUpdate(prevProps,){
    if(prevProps.userId !== this.props.userId){
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
    }
  }

  render(){
    const { user, stories} = this.state;
    return (
      <div id="add-story">
      <div><button onClick={() => this.createAStory(user)}>ADD STORY</button>
         Details for { user.name }
         <hr></hr>
        <p>
          <h3>BIO:</h3>
          { user.bio }
        </p>
        </div>
        <ul>
          {
            stories.map( story => {
              return (
    
                <li id="story" key={ story.id }>
                  <h3>STORY:</h3>
                  { story.title }
                  <p>
                  { story.body }
                  </p><button id="rm-story" onClick={event => this.handleClick(event, this.deleteAStory(story))}>DELETE STORY</button>
                </li>

              );
            })
          }
        </ul>
        <hr></hr>
      </div>
    );
  }
}



export default User;
