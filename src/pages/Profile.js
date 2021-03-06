import React, { Component } from "react";
import { getUser } from "../utils/auth";
import Axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import "../stylesheets/profile.css";
import qs from "querystring";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userPlants: [],
      messages: [],     
    }
  }
  componentDidMount() {
    let user = getUser()
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE}/userPlants`,
      withCredentials: true
    })
      .then((responsePlants) => {
        Axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_BASE}/messages/${user._id}`,
          withCredentials: true
        })
          .then((responseMessages) => {
            if (responseMessages.data.messages.length === 0) {
              this.setState({
                userPlants: responsePlants.data.userPlants
              })
            } else {
              this.setState({
                userPlants: responsePlants.data.userPlants,
                messages: responseMessages.data.messages
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deletePlant = (id) => {
    Axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_BASE}/userPlants/${id}`,
      withCredentials: true,
    })
      .then(() => {
        let newList = this.state.userPlants.filter((plant) => id !== plant._id);
        this.setState({
          userPlants: newList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    let user = getUser();
    let userPlants = this.state.userPlants;
    let messages = this.state.messages;
    return (
      <div>
        {!user ? (
          <Redirect to="/login" />
        ) : (
            <div>
              <div className="hero-image-profile">
                <div className="hero-text">
                  <h1>Welcome {user.username}!</h1>{" "}
                </div>
              </div>

              <div className="container">
                <h4>The plants you want to share:</h4>

                <div className="card-columns">
                  {userPlants.map((plant, index) => {
                    return (
                      <PlantCard
                        key={index}
                        plant={plant}
                        onDelete={() => {
                          this.deletePlant(plant._id);
                        }}
                      />
                    );
                  })}
                </div>
                <div>
                  <Link to="/add-plant" className="caption btn btn-success">
                    Add your plants
                </Link>
                </div>
                <div className="message-inbox">
                  <h4>Messages you received from other plant owners</h4>
                  {messages !== null && messages.map((message, index) => (
                    <div className="message">
                      <h6>{message.title}</h6>
                      <p key={message._id}>{message.message}</p><p> from {message.message_from.username} - {message.message_from.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default withRouter(Profile);
