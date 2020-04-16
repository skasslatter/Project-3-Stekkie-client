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
      <Navbar collapseOnSelect expand="lg"  variant="dark">
        <Navbar.Brand href="/">
        <img src="/Stekkie_logo-diagonal.png" className="logo-navbar"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="/signup">Signup</Nav.Link>
            <Nav.Link className="nav-link" href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      ) : (
        <Navbar collapseOnSelect expand="lg"  variant="dark">
        <Navbar.Brand href="/profile">
        <img src="/Stekkie_logo-diagonal.png" className="logo-navbar"/>
        </Navbar.Brand>        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="/profile">Profile</Nav.Link>
            <Nav.Link className="nav-link" href="/marketplace">Marketplace</Nav.Link>
            <Nav.Link className="nav-link" href="/" onClick={this.logoutUser} className="logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      // <div>
      //   {!user ? (
      //     <div className="nav">
      //       <div>
      //         <Link to="/signup">Signup</Link>
      //       </div>
      //       <div>
      //         <Link to="/">
      //           <img
      //             className="home-icon"
      //             src="/pngkey.com-home-png-2373015 copy.png"
      //             alt="Home"
      //           ></img>
      //         </Link>
      //       </div>
      //       <div>
      //         <Link to="/login">Login</Link>
      //       </div>
      //     </div>
      //   ) : (
      //     <div className="nav">
      //       <div>
      //         <p>Welcome {user.username}</p>
      //       </div>
      //       <div>
      //         <Link to="/profile">
      //           <img
      //             className="home-icon"
      //             src="/pngkey.com-home-png-2373015 copy.png"
      //             alt="Home"
      //           ></img>
      //         </Link>
      //       </div>
      //       <div>
      //         <p onClick={this.logoutUser}>Logout</p>
      //       </div>
      //     </div>
      //   )}
      // </div>
      
    )
      }</div>
    )
  }
}

export default withRouter(Navigation);
