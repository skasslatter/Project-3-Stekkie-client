import React from "react";
import { Link } from "react-router-dom";

export default class PlantCard extends React.Component {
  render() {
    let distanceComponent = <div></div>;
    if (!this.props.plant.distance) {
      distanceComponent = <div />;
    } else {
      let distance = (this.props.plant.distance / 1000).toFixed(2);
      distanceComponent = <h5>{`${distance} km away`}</h5>;
    }

    return (
      <div className="card">
        <Link to={`/plants/${this.props.plant._id}`} className="card-link">
          <img
            className="card-img-top list-img"
            src={this.props.plant.imgPath}
            alt="Card image cap"
          />
          <div className="card-body">
            <h3 className="card-title">{this.props.plant.title}</h3>
            {distanceComponent}
          </div>
        </Link>

        {!this.props.onDelete ? (
          <div className="card-footer">
            <p>You want this plant? </p>
            <Link to={`/plants/${this.props.plant._id}`}>
              <button className="btn btn-warning">💌 Contact the owner</button>
            </Link>
          </div>
        ) : (
          <div className="card-footer">
            <Link
              to={`/plants/${this.props.plant._id}/update`}
              className="btn btn-danger"
            >
              Modify
            </Link>
            <button onClick={this.props.onDelete} className="btn btn-danger">
              Remove
            </button>
          </div>
        )}
      </div>
    );
  }
}
