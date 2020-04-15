import React from "react";

export default class DetailView extends React.Component {
  
  render() {
    return (
      <div className="card detailview">
        <img
          className="card-img-top"
          src={this.props.plant.imgPath}
          alt="Card image cap"
        />
        <div className="card-body">
          <h3 className="card-title">{this.props.plant.title}</h3>
          <h6 className="card-title">
            Scientific name: {this.props.plant.name}
          </h6>
          <div>{this.props.plant.description}</div>
          <div>Free or for exchange: {this.props.plant.paymentType}</div>
        </div>


        {!this.props.onDelete ? (
          <div />
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
