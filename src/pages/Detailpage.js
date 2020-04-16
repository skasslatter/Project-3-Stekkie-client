import React from "react";
import Axios from "axios";
import DetailView from "../components/DetailView";

export default class DetailPage extends React.Component {
  constructor() {
    super();
    this.state = {
      plant: "",
      apiInfo: ""
    };
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
        this.setState({ plant: response.data.plant, apiInfo: response.data.api});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {!this.state.plant && <h1>Loading...</h1>}
        {this.state.plant && 
        <DetailView 
        plant={this.state.plant} />}
      </div>
    );
  }
}
