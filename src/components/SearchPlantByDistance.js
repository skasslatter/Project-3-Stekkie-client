import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { getUser } from "../utils/auth";
import { Link } from "react-router-dom";


let MarkerComponent = ({ text, plant }) => <Link to={`/plants/${plant._id}`} className="markerComponent">{text}</Link>;

class SearchPlantByName extends Component {
  state = {
    searchValue: "",
  };

  handleOnChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
    this.props.handleSearch(event.target.value);
  };

  render() {
    let user = getUser();
    console.log("USER", user);
    console.log("PLANTS", this.props.plants);
    let allPlants = this.props.plants;

    return (
      <div>
        {/* <label>Search plants by distance</label> */}
        <select
          name="distance"
          className="distance-search"
          onChange={(event) => this.handleOnChange(event)}
        >
          <option value="" selected disabled hidden>
            Select distance
          </option>
          <option value="2000">less than 2 km away</option>
          <option value="5000">less than 5 km away</option>
          <option value="10000">less than 10 km away</option>
        </select>
        <div className="map" style={{ height: "70vh", width: "100%" }}>
          <GoogleMapReact defaultCenter={user.coordinates} defaultZoom={13}>
              {allPlants
              .filter(plant => plant.creator && plant.creator.coordinates)
              .map((plant) => {
                console.log("THIS", plant.creator.coordinates)
                return (
                  <MarkerComponent
                    key={plant._id}
                    lat={plant.creator.coordinates[0]}
                    lng={plant.creator.coordinates[1]}
                    plant={plant}
                    text="🌼"
                  />
                );
              })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default SearchPlantByName;
