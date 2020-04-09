import React, { Component } from 'react'
import { getUser } from '../utils/auth'
// import {searchPlants} from  '../utils/api'
import Axios from 'axios';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      plants: []
    };
  }

  componentDidMount() {
    Axios
    .get("http://localhost:3000/api")
    .then((response) => {
      this.setState({plants: response.plants});
    })
    .catch((err) => {
      console.log(err)
  });
  }

  render() {
    let user =getUser()
    return (
      <div>
        <h1>Welcome {user.username}</h1>
        <div>
        <p>This are the plant you are offering at the moment:</p>

          <ul>
          <li>Plant 1</li>
          <li>Plant 2</li>

          </ul>
        </div>
      </div>
    )
  }
}

export default Profile

