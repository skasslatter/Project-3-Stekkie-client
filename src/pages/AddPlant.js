import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { getUser } from "../utils/auth";
import Autosuggest from "react-autosuggest";
import "../stylesheets/addPlant.css";

class AddPlant extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      suggestions: [],
      plant: {
        name: "",
        title: "",
        image: "",
        description: "",
        paymentType: "",
      },
    };
  }

  // componentDidMount() {
  //   Axios({
  //     method: "GET",
  //     url: "http://localhost:3000/api/search",
  //     withCredentials: true,
  //   })
  //     .then((response) => {
  //       this.setState({ plants: response.plants });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(this.formRef.current);
    Axios({
      method: "POST",
      url: "http://localhost:3000/userPlants/create",
      withCredentials: true,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        this.props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onNameChange = (event, { newValue }) => {
    // debugger
    this.setState({
      name: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length <= 2){
      this.setState({
        suggestions: [],
      });
      return
    }
    Axios({
      method: "GET",
      url: `http://localhost:3000/api/search?q=${value}`,
      withCredentials: true,
    })
    .then((response) => {
      const filteredSuggestions = response.data.plants.filter(plant =>
        plant.common_name !== null
        )
      this.setState({
        suggestions: filteredSuggestions
      });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    let user = getUser();
    const autosuggestProps = {
      name: "name",
      placeholder: "Type to search for a plant",
      value: this.state.name,
      onChange: this.onNameChange,
    };

    return (
      <div>
        {!user ? (
          <Redirect to="/login" />
        ) : (
          <div>
            <form onSubmit={this.handleSubmit} ref={this.formRef}>
              <h1>Add a plant</h1>
              <div className="form-group">
                <label>Name:</label>
                <Autosuggest
                  suggestions={this.state.suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={(suggestion) => suggestion.common_name}
                  renderSuggestion={(suggestion) => `${suggestion.common_name} (${suggestion.scientific_name})`}
                  inputProps={autosuggestProps}
                />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input type="text" name="title" className="form-control" />
              </div>
              <div className="form-group">
                <label>Image Url:</label>
                <input type="file" name="photo" className="form-control" />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Payment type (please choose)</label>
                <select name="paymentType" className="form-control">
                  <option value="exchange">Exchange</option>
                  <option value="free">Free</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success">Add plant</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddPlant;
