import React, { Component } from "react";

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
    return (
      <div>
        <label>Search plants by distance</label>
        <select
          name="distance"
          className="form-control"
          onChange={(event) => this.handleOnChange(event)}
        >
        
          <option value="" selected diabled hidden>Please select</option>
          <option value="2000">less than 2 km away</option>
          <option value="5000">less than 5 km away</option>
          <option value="10000">less than 10 km away</option>
        </select>
      </div>
    );
  }
}

export default SearchPlantByName;
