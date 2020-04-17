import React, { Component } from 'react'
import Axios from "axios";
import qs from "querystring";
import "../stylesheets/email.css";

class SendEmail extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            data: {
                email: "",
                subject: "",
                text: "",
            }
        }
    }

    handleInput(event) {
        let dataCopy = { ...this.state.data };
        dataCopy[event.target.name] = event.target.value;
        this.setState({
          data: dataCopy,
        });
      }

    handleSubmit(e){
        let recipient = this.props.match.params.id
        console.log(recipient) 
        Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_BASE}/email/${recipient}`,
            withCredentials: true,
            data: qs.stringify(this.state.data),
            headers: {
              "content-type": "application/x-www-form-urlencoded" ,
            },
          })
          .then((response) => {
            if (response.data.msg === "success"){
                console.log("message sent!")
              } else if (response.data.msg === "fail"){
                console.log("Message failed to send")
              }
            this.props.history.push("/profile");
          })
          .catch((error) => {
            console.log(error);
          });  
    }

    render() {
        return (
            <div>
            <div class="hero-image-email">
              <div class="hero-text">
              <h1>
              Contact the gardener <span>🌼</span>
              </h1>
            </div>
            </div>
              <div className="email">
              <div className="form-group">
                    <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={this.state.subject} 
                    onChange={this.handleInput} 
                    placeholder="Subject" /><br/>
                    </div>
                    <div className="form-group">
                    <input 
                    type="email" 
                    id="email" name="email" 
                    value={this.state.email} 
                    onChange={this.handleInput} 
                    placeholder="Email" /><br/>
                    </div>
                    <div className="form-group">
                    <textarea 
                    name="text" 
                    id="text" name="text" 
                    value={this.state.text} 
                    onChange={this.handleInput} 
                    placeholder="I love your plant"
                    cols="30" 
                    rows="10" /><br/>
                    </div>
                    
                    <button onClick={this.handleSubmit} type="submit" className="btn btn-success">Send email</button>
                </div>
            </div>
        )
    }
}

export default SendEmail

