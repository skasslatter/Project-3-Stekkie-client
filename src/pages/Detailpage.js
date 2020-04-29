import React from "react";
import Axios from "axios";
import DetailView from "../components/DetailView";
import qs from "querystring";
import { getUser } from "../utils/auth";


export default class DetailPage extends React.Component {
  constructor() {
    super();
    this.state = {
      plant: "",
      apiInfo: "",
      messages: {
        title: "",
        message_to_user: "",
        message_from: "",
        message: "",
      }
    }
    this.messageHandler = this.messageHandler.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
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
        this.setState({ plant: response.data.plant, apiInfo: response.data.api });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  messageHandler(event){
    let user = getUser()
    let plant_owner = this.state.plant.creator
    let plant_title = this.state.plant.title
    this.setState({
      messages: {
        title: plant_title,
        message_to_user: plant_owner,
        message_from: user._id,
        message: event.target.value
      }
    })
  }
  sendMessage(){
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASE}/messages/newmessage`,
      withCredentials: true,
      data: qs.stringify(this.state.messages),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      }
    })
      .then((response) => {
        console.log(response)
        this.props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
      })
    }
  render() {
    return (
      <div>
        {!this.state.plant && <h1>Loading...</h1>}
        {this.state.plant && 
        <DetailView 
        plant={this.state.plant} 
        api={this.state.apiInfo}
        />}
        <div>
          <h3>Leave a message for the plant owner</h3>
          <textarea name="" cols="40" rows="10" onChange={this.messageHandler} placeholder="Type your message to the lovely plant owner here and exchange your contact information to swap"></textarea>
          <button onClick={this.sendMessage}>Start swapping!</button>
        </div>
      </div>
    );
  }
}
