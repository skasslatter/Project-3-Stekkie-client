import React from "react";
import { getUser } from "../utils/auth";
import { Link } from "react-router-dom";
import "../stylesheets/detailpage.css";

export default class DetailView extends React.Component {
  render() {
    const user = getUser();
    return (
      <div className="card detailview">
        <img
          className="card-img-top detail-img"
          src={this.props.plant.imgPath}
          alt="Card image cap"
        />
        <div className="card-body">
          <h3 className="card-title">{this.props.plant.title}</h3>
          <h6 className="card-title">
            Scientific name: <span className="detail-span">{this.props.plant.name}</span>
          </h6>
          <h6 className="card-title">
            Family name: <span className="detail-span">{this.props.api.family_common_name}</span>
          </h6>
          <h6 className="card-title">Description:<span className="detail-span"> {this.props.plant.description}</span></h6>
          <h6 className="card-title">Free or for exchange: <span className="detail-span">{this.props.plant.paymentType}</span></h6>
        </div>

        {this.props.plant.creator !== user._id ? (
          <Link to={`/email/${this.props.plant.creator}`}>
            <button className="btn btn-warning">💌 Contact the owner</button>
          </Link>
        ) : (
          <div className="card-footer">
            <button onClick={this.props.onDelete} className="btn btn-danger">
              Remove
            </button>
          </div>
        )}
      </div>
    );
  }
}
