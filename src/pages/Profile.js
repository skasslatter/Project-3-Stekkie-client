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
      url: "http://localhost:3000/userPlants",
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

  // deletePlant = (index) => {
  //   let newList = [...this.state.userPlants];
  //   newList.splice(index, 1);
  //   this.setState({
  //     userPlants: newList,
  //   });
  // };

  deletePlant = (id) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:3000/userPlants/${id}`,
      withCredentials: true,
    })
      .then(() => {
        let newList = this.state.userPlants.filter((plant) => 
        id !== plant._id);
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
            <h1>Welcome {user.username}</h1>
            <div>
              <p>This are the plant you are offering at the moment:</p>

              <div class="card-deck">
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
                  Add another plant
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
