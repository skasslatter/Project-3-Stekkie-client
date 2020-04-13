import "../stylesheets/homepage.css";
import React from "react";
import { Link } from "react-router-dom";

export default class Homepage extends React.Component {
  render() {
    return (
      <section className="bgimage">
          <div className="hero-text">
            <h1 className="caption ">Welcome to You grow girl!</h1>
            <div className="row auth-buttons">
              <Link to="/signup" className="caption btn btn-success">
                Signup now
              </Link>

              <Link to="/login" className="caption btn btn-success">
                Login
              </Link>
            </div>
        </div>
      </section>
    );
  }
}
