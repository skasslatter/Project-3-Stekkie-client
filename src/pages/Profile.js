import React, { Component } from 'react'
import { getUser } from '../utils/auth'

class Profile extends Component {

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
