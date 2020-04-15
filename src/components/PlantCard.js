import React from "react";
import { Link } from "react-router-dom";

export default class PlantCard extends React.Component {
  render() {
    return (
      <div className="card">
      <Link to={`/plants/${this.props.plant._id}`} className="card-link">
        <img
          className="card-img-top list-img"
          src={this.props.plant.imgPath}
          alt="Card image cap"
        />
        <div className="card-body">
          <h4 className="card-title">{this.props.plant.title}</h4>
          <p>Click for more information</p>
        </div>
        </Link>

        {!this.props.onDelete ? (
          <div className="card-footer">
              <p>You want this plant? </p>
              <Link to="/chat/private">
                <button className="btn btn-warning">
                  Click here to contact the plant owner
                </button>
              </Link>
            </div>
        ) : (
          <div className="card-footer">
            <button onClick={this.props.onDelete} className="btn btn-danger">
              Remove
            </button>
            {/* <small class="text-muted">
                          Last updated 3 mins ago
                        </small> */}
          </div>
        )}
      </div>
    );
  }
}


