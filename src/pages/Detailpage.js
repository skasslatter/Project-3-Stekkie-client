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
      },
      data: {
        email: "",
        title: "",
        text: "",
        sender: ""
      }
    }
    this.messageHandler = this.messageHandler.bind(this)
    this.handleInput = this.handleInput.bind(this);
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
  handleInput(event) {
    let user = getUser()
    let sender = user.username
    let plant_title = this.state.plant.title
    let dataCopy = { ...this.state.data };
    dataCopy[event.target.name] = event.target.value;
    this.setState({
      data: {
        title: plant_title,
        sender: sender,
        email: dataCopy.email,
        text: dataCopy.text,
      }
    });
  }
  messageHandler(event) {
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
  sendMessage() {
    let plant_owner = this.state.plant.creator
    console.log(plant_owner)
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
        Axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_BASE}/email/${plant_owner}`,
          withCredentials: true,
          data: qs.stringify(this.state.data),
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => {
            if (response.data.msg === "success") {
              console.log("message sent!");
            } else if (response.data.msg === "fail") {
              console.log("Message failed to send");
            }
            this.props.history.push("/profile");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })

  }
  render() {
    const user = getUser()
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-detail"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container" id="sign-up">
                <div className="row"></div>
                {!this.state.plant && <h1>Loading...</h1>}
                {this.state.plant &&
                  <DetailView
                    plant={this.state.plant}
                    api={this.state.apiInfo}
                  />}

                {this.state.plant.creator !== user._id ? (
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3>💌 Contact the owner</h3>
                    <div className="form-group">
                      <h5>Your email address</h5>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.data.email}
                        onChange={this.handleInput}
                        placeholder="Email"
                        className="form-control"
                      />

                    </div>
                    <div className="form-group">
                      <h5>Your message to the plant owner</h5>
                      <textarea
                        name="text"
                        id="text"
                        name="text"
                        value={this.state.data.text}
                        onChange={e => { this.handleInput(e); this.messageHandler(e) }}
                        placeholder="Type your message to the lovely plant owner here and exchange your contact information to swap"
                        cols="30"
                        rows="10"
                        className="form-control"
                      />

                    </div>
                    <button className="btn btn-success" onClick={this.sendMessage}>Start swapping!</button>
                  </div>
                ) : (
                    <div >
                      <h5>This is your beautiful plant</h5>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
