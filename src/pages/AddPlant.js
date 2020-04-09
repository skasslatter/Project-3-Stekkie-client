import React from "react";
import Axios from "../../../Project-3-api/node_modules/axios";

class AddPlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSuggestions: [],
      plant: {
        name: "",
        image: "",
      }
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault(); //to not reload the page
    Axios.post("http://localhost:3000/userPlants/create")
      .then(() => {
        this.props.history.push("/profile")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleNameInput = (event) => {
    //call API
    this.setState({
      plant: {
        ...this.state.plant,
        name: event.target.value
      }
    });
  };

  handleImageInput = (event) => {
    this.setState({
      plant: {
        ...this.state.plant,
        image: event.target.value
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h1>Add a plant</h1>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.plant.name}
              className="input is-primary is-small"
              onChange={(e) => this.handleNameInput(e)}
            />
          </div>
          <div>
            <label>Image Url:</label>
            <input
              type="text"
              name="image"
              value={this.state.plant.image}
              className="input is-primary is-small"
              onChange={(e) => this.handleImageInput(e)}
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="button **is-large is-success is-rounded**"
          />
        </form>
      </div>
    );
  }
}

export default AddPlant;
