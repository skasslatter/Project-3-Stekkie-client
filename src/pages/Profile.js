import React, { Component } from "react";
import { getUser } from "../utils/auth";
// import {searchPlants} from  '../utils/api'
import Axios from "axios";
// import AddPlant from "module";
import {Redirect, withRouter} from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userPlants: [],
    };
  }
  componentDidMount() {
    Axios({
      method: "GET",
      url: "http://localhost:3000/userPlants",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data)
        this.setState({ userPlants: response.data.userPlants });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let user = getUser();
    let userPlants = this.state.userPlants;
    return (
      <div>
        {!user ? (
          <Redirect to="/login"/>
        )
        : (
          <div>
          <h1>Welcome {user.username}</h1>
          <div>
            <p>This are the plant you are offering at the moment:</p>
  
            <ul>
              {userPlants.map((plants, index) => {
                return(
                  <li key={index}>{plants.title}</li>
                )
              })}
            </ul>
          </div> 
          </div> 
        )}
      </div>
    );
  }
}

export default withRouter(Profile);
