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
      plantApiId: "",
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

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(this.formRef.current);
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASE}/userPlants/create`,
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
    if (value.length <= 2) {
      this.setState({
        suggestions: [],
        plantApiId: ""
      });
      return;
    }
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE}/api/search?q=${value}`,
      withCredentials: true,
    }).then((response) => {
      const filteredSuggestions = response.data.plants.filter(
        (plant) => plant.common_name !== null
      );
      this.setState({
        suggestions: filteredSuggestions,
        plantApiId: ""
      });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const selectedPlantId = suggestion.id;
    this.setState({
      plantApiId: selectedPlantId,
    })
  };

  render() {
    const user = getUser();
    const autosuggestProps = {
      name: "name",
      placeholder: "Type to search for the scientific name of your plant",
      value: this.state.name,
      onChange: this.onNameChange,
    };

    return (
      <div>
        {!user ? (
          <Redirect to="/login" />
        ) : (
            <div className="container-fluid">
              <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-add-plant"></div>
                <div className="col-md-8 col-lg-6">
                  <div className="login d-flex align-items-center py-5">
                    <div className="container" id="sign-up">
                      <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                          <div className="container">
                            <div className="row form-row">
                              <form onSubmit={this.handleSubmit} ref={this.formRef}>
                                <h1>Add a plant</h1>
                                <div className="form-group">
                                  <h6>Name:</h6>
                                  <Autosuggest
                                    suggestions={this.state.suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={(suggestion) => suggestion.common_name}
                                    renderSuggestion={(suggestion) =>
                                      `${suggestion.common_name} (${suggestion.scientific_name})`
                                    }
                                    inputProps={autosuggestProps}
                                    onSuggestionSelected={this.onSuggestionSelected}
                                  />
                                  <input type="hidden" name="plantApiId" value={this.state.plantApiId} />
                                </div>
                                <div className="form-group">
                                  <h6>Your title:</h6>
                                  <input type="text" name="title" className="form-control" />
                                </div>
                                <div className="form-group">
                                  <h6>Image Url:</h6>
                                  <input type="file" name="photo" className="form-control" />
                                </div>
                                <div className="form-group">
                                  <h6>Short description:</h6>
                                  <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <h6>Payment type (please choose)</h6>
                                  <select name="paymentType" className="form-control">
                                    <option value="exchange">Exchange</option>
                                    <option value="free">Free</option>
                                  </select>
                                </div>
                                <button type="submit" className="btn btn-success">
                                  Add plant
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
      </div>
    );
  }
}

export default AddPlant;
