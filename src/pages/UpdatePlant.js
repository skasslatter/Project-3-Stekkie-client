import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { getUser } from "../utils/auth";
import "../stylesheets/addPlant.css";


class UpdatePlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: {
        name: "",
        title: "",
        image: "",
        description: "",
        paymentType: "",
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const selectedPlant = this.props.match.params.id;
    Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE}/plants/${selectedPlant}`,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        this.setState({ plant: response.data.plant });
        console.log("state", this.state.plant)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASE}/userPlants/${this.state.plant._id}/update`,
      withCredentials: true,
      data: this.state.plant,
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
    })
      .then((response) => {
        this.props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange(e) {
    let plantCopy = { ...this.state.plant };
    plantCopy[e.target.name] = e.target.value;
    this.setState({
      plant: plantCopy
    })
  }

  render() {
    const user = getUser();

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
                          <form onSubmit={this.handleSubmit}>

                              <h1>Update your a plant</h1>
                              <div className="form-group">
                                <h6>Name</h6>
                                <p className="detail-span">{this.state.plant.name}</p>
                              </div>
                              <div className="form-group">
                                <h6>Your personal title:</h6>
                                <input
                                  type="text"
                                  name="title"
                                  className="form-control detail-span"
                                  value={this.state.plant.title}
                                  onChange={this.handleInputChange}                                
                                  />
                              </div>
                              <div className="form-group">
                                <h6>Short description:</h6>
                                <input
                                  type="text"
                                  name="description"
                                  className="form-control"
                                  value={this.state.plant.description}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="form-group">
                                <h6>Payment type (please choose)</h6>
                                <select
                                  name="paymentType"
                                  className="form-control"
                                  value={this.state.plant.paymentType}
                                  onChange={this.handleInputChange}
                                >
                                  <option value="exchange">Exchange</option>
                                  <option value="free">Free</option>
                                </select>
                              </div>
                              <button type="submit" className="btn btn-success">
                                Update plant
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
        )}
      </div>
    );
  }
}

export default UpdatePlant;
