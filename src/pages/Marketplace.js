import React, { Component } from "react";
import { getUser } from "../utils/auth";
import Axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import SearchPlant from "../components/SearchPlant";

import "../stylesheets/marketplace.css";

class Marketplace extends Component {
  constructor() {
    super();
    this.state = {
      plants: [],
    };
  }

  componentDidMount() {
    this.getAllPlants();
  }

  getAllPlants() {
    Axios({
      method: "GET",
      url: "http://localhost:3000/marketplace",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ plants: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch = (searchValue) => {
    if (searchValue.trim().length === 0) {
      this.getAllPlants();
    } else {
      Axios({
        method: "GET",
        url: `http://localhost:3000/marketplace/search?q=${searchValue}`,
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data);
          this.setState({ plants: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    let user = getUser();
    let plants = this.state.plants;
    return (
      <div>
        <SearchPlant handleSearch={this.handleSearch} />

        {!user ? (
          <div>
            <Redirect to="/login" />
          </div>
        ) : (
            <div>
              <p>This are the offered plants:</p>
              <div className="card-deck">
                {plants.map((plant, index) => {
                  return (
                    <PlantCard key={index} plant={plant} />
                  );
                })}
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default withRouter(Marketplace);
