import React, { Component } from 'react'
import { login } from "../utils/auth"
import "../stylesheets/signup.css";

class Login extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  state = {
    user: {
      username: "",
      password: ""
    },
    error: null
  }

  handleInputChange(e) {
    let userCopy = { ...this.state.user };
    userCopy[e.target.name] = e.target.value;
    this.setState({
      user: userCopy
    })
  }

  handleLoginClick() {
    login(this.state.user)
      .then(() => {
        this.setState({
          error: null
        }, () => {
          this.props.history.push("/profile")
        })
      })
      .catch((error) => {
        this.setState({ error: error.response && error.response.data })
      })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container" id="sign-up">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Log in to start!</h3>

                    <div className="form-group">
                      <label>Username</label>
                      <input
                        className="form-control"
                        onChange={this.handleInputChange}
                        value={this.state.user.username}
                        name="username"
                        type="text"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label">Password</label>
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.user.password}
                        className="form-control"
                        name="password"
                        type="password"
                      />
                    </div>

                    <button className="btn-success btn" onClick={this.handleLoginClick}>
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
