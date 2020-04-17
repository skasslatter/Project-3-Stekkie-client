import React, { Component } from "react";
import { getUser } from "../utils/auth";
import Axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PlantCard from "../components/PlantCard";

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
      url: `${process.env.REACT_APP_API_BASE}/userPlants`,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ userPlants: response.data.userPlants });
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
    return (
      <div>
        {!user ? (
          <Redirect to="/login" />
        ) : (
          <div>
            <div class="hero-image-profile">
              <div class="hero-text">
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Profile);
