import React from "react";
import { getUser, logout } from "../utils/auth";
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../stylesheets/nav.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    logout().then(() => {
      this.props.history.push("/login");
    });
  }

  render() {
    let user = getUser();
    return (
      <div className="navbar">
        {!user ? (
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href="/">
              <img src="/Stekkie_logo-diagonal.png" className="logo-navbar" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        ) : (
            <Navbar collapseOnSelect expand="lg" variant="dark">
              <Navbar.Brand href="/profile">
                <img src="/Stekkie_logo-diagonal.png" className="logo-navbar" />
              </Navbar.Brand>        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/marketplace">Marketplace</Nav.Link>
                  <p onClick={this.logoutUser} className="logout">Logout</p>
                  </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    )}
    </div>
          )
        }
}

export default withRouter(Navigation);
