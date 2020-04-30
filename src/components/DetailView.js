import React from "react";
import "../stylesheets/detailpage.css";

export default class DetailView extends React.Component {
  render() {
    return (
      <div className="col-md-9 col-lg-8 mx-auto">
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
            {this.props.api.family_common_name && <h6 className="card-title">
              Family name: <span className="detail-span">{this.props.api.family_common_name}</span>
            </h6>}
            <h6 className="card-title">Description:<span className="detail-span"> {this.props.plant.description}</span></h6>
            <h6 className="card-title">Free or for exchange: <span className="detail-span">{this.props.plant.paymentType}</span></h6>
          </div>

        </div>
      </div>

    );
  }
}
