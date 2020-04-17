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
        <input
          className="search-name"
          placeholder="Plant name..."
          type="text"
          name="text"
          onChange={(event) => this.handleOnChange(event)}
        />
      </div>
    );
  }
}

export default SearchPlantByName;
