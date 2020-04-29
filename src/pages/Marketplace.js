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
      searchType: "all",
      plants: [],
    };
    this.handleSearchByDistance = this.handleSearchByDistance.bind(this);
    this.handleSearchByName = this.handleSearchByName.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
    this.getAllPlants = this.getAllPlants.bind(this);
  }

  componentDidMount() {
    this.getAllPlants();
  }

  //handles the drop down search menu
  handleSearchType(search) {
    let selectedSearch = search.target.value;
    if (selectedSearch === "all" || selectedSearch === "name") {
      this.getAllPlants();
    }
    else {
      this.handleSearchByDistance(2000)
    }
    this.setState({ searchType: selectedSearch });
  }

  getAllPlants() {
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE}/marketplace`,
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

  //to search by name
  handleSearchByName = (searchValue) => {
    if (searchValue.trim().length === 0) {
      this.getAllPlants();
    } else {
      Axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_BASE}/marketplace/search?q=${searchValue}`,
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

  //to search by distance
  handleSearchByDistance = (distance) => {
    if (!distance || distance === "") {
      return;
    }
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE}/marketplace/searchGeo?distance=${distance}`,
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
    let searchComponent = <div></div>;

    if (this.state.searchType === "all") {
      searchComponent = <div></div>;
    } else if (this.state.searchType === "distance") {
      searchComponent = (
        <SearchPlantByDistance
          handleSearch={this.handleSearchByDistance}
          plants={this.state.plants}
        />
      );
    } else if (this.state.searchType === "name") {
      searchComponent = (
        <SearchPlantByName handleSearch={this.handleSearchByName} />
      );
    }

    return (
      <div>
        {!user ? (
          <div>
            <Redirect to="/login" />
          </div>
        ) : (
          <div>
            <div className="hero-image-marketplace">
              <div className="hero-text-marketplace">
                <h1>
                  Community Garden <span>🌼</span>
                </h1>
              </div>
            </div>

            <div className="container">
              <div className="search-header">
                <div>
                  <h4 id="search-title">I want to </h4>
                  <select
                    name="search"
                    className="search-select"
                    onChange={(event) => this.handleSearchType(event)}
                  >
                    <option value="all" selected>
                      see All Plants
                    </option>
                    <option value="name">search by Name</option>
                    <option value="distance">search by Distance</option>
                  </select>
                </div>
                {searchComponent}
              </div>
              <div className="card-columns">
                {this.state.plants.map((plant, index) => {
                  return <PlantCard key={index} plant={plant} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Marketplace);
