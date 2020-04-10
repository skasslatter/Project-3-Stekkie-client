import React from "react";
import Axios from "axios";

class AddPlant extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      plant: {
        title: "",
        image: "",
        description: "",
        paymentType: "",
      }
    };
  }
handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(this.formRef.current);
    Axios({
        method: "POST",
        url: "http://localhost:3000/userPlants/create", 
        withCredentials: true,
        data: formData,
        headers: {
            "content-type": 'multipart/form-data'
        }
    })
        .then(response => {
          this.props.history.push("/profile")
        })
        .catch((error) => {
            console.log(error)
        })
}

  // handleFormSubmit = (event) => {
  //   event.preventDefault(); //to not reload the page
  //   Axios.post("http://localhost:3000/userPlants/create")
  //     .then(() => {
  //       this.props.history.push("/profile")
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // handleNameInput = (event) => {
  //   //call API
  //   this.setState({
  //     plant: {
  //       ...this.state.plant,
  //       name: event.target.value
  //     }
  //   });
  // };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} ref={this.formRef}>
          <h1>Add a plant</h1>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              // value={this.state.plant.title}
              // onChange={(e) => this.handleN(e)}
            />
          </div>
          <div>
            <label>Image Url:</label>
            <input
              type="file"
              name="photo"
              // value={this.state.plant.image}
              // onChange={(e) => this.handleImageInput(e)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              // value={this.state.plant.description}
              // onChange={(e) => this.handleN(e)}
            />
          </div>
          <div>
            <label>Payment type</label>
            <select
              name="paymentType"
              // value={this.state.plant.paymentType}
              // onChange={(e) => this.handleN(e)}
            >
              <option value="exchange">
                Exchange
              </option>
              <option value="free">
                Free
              </option>
            </select>
          </div>
          <button type="submit">Add plant</button>
        </form>
      </div>
    );
  }
}

export default AddPlant;
