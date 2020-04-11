import "../stylesheets/homepage.css";
import React from "react";
import { Link } from "react-router-dom";


export default class Homepage extends React.Component {
  render() {
    return (
      <section class="bgimage">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-12">
              <h1 className="caption">Welcome to You grow girl!</h1>
            </div>
            </div>
            <div class="row auth-buttons">
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
