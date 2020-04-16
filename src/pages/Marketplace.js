import React, { Component } from "react";
import { getUser } from "../utils/auth";
import Axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import SearchPlantByName from "../components/SearchPlantByName";
import SearchPlantByDistance from "../components/SearchPlantByDistance";

import "../stylesheets/marketplace.css";

class Marketplace extends Component {
  constructor() {
    super();
    this.state = {
      plants: [],
    };
    this.handleSearchByDistance = this.handleSearchByDistance.bind(this);
    this.handleSearchByName = this.handleSearchByName.bind(this);
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

  handleSearchByName = (searchValue) => {
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

  handleSearchByDistance = (distance) => {
    if (!distance || distance === ""){
      return
    }
    Axios({
      method: "GET",
      url: `http://localhost:3000/marketplace/searchGeo?distance=${distance}`,
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      this.setState({ plants: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    let user = getUser();
    let plants = this.state.plants;
    return (
      <div>
        <SearchPlantByName handleSearch={this.handleSearchByName} />
        <SearchPlantByDistance handleSearch={this.handleSearchByDistance} />

        {!user ? (
          <div>
            <Redirect to="/login" />
          </div>
        ) : (
          <div>
            <p>This are the offered plants:</p>
            <div className="card-deck">
              {plants.map((plant, index) => {
                return <PlantCard key={index} plant={plant} />;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Marketplace);
