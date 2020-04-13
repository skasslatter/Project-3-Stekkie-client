import "../stylesheets/homepage.css";
import React from "react";
import { Link } from "react-router-dom";


export default class Homepage extends React.Component {
  render() {
    return (
      <section className="bgimage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="caption">Welcome to You grow girl!</h1>
            </div>
            </div>
            <div className="row auth-buttons">
            <div>
              <Link to="/signup" className="caption btn btn-success">Signup now</Link>
            </div>
            <div>
              <Link to="/login" className="caption btn btn-success">Login</Link>
            </div>
            </div>
          </div>
      </section>
    );
  }
}
