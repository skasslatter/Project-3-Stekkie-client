import React from "react";

export default class PlantCard extends React.Component {
  render() {
    return (
      <div class="card">
        <img
          class="card-img-top"
          src={this.props.plant.imgPath}
          alt="Card image cap"
        />
        <div class="card-body">
          <h4 class="card-title">{this.props.plant.title}</h4>
        </div>

        {!this.props.onDelete ? (
          <div />
        ) : (
          <div class="card-footer">
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
