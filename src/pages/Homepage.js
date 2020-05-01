import "../stylesheets/homepage.css";
import React from "react";

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <section className="bgimage">
          <div className="hero-text">
            <div>
              <h2>The plant swapping app</h2>
            </div>

            {/* signup and login buttons */}
            {/* <div className="row auth-buttons">
            <Link to="/signup" className="caption btn btn-success">
              Signup
            </Link>
            <Link to="/login" className="caption btn btn-success">
              Login
            </Link>
          </div> */}
            <p className="subtitle">A new Stekkie for your stekkie</p>
          </div>
        </section>
        <section className="features">
          <div className="how-section1">
            <div className="row">
              <div className="col-md-6 how-img">
                <img
                  src="/annie-spratt-8mqOw4DBBSg-unsplash.jpg"
                  className="rounded-circle img-fluid"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <h4>Share the plant love</h4>
                <p className="text-muted">
                  Trade you my Monstera pup for your green zebra tomato
                  seedling? We want to give you the possibility of sharing your
                  beautiful plants and maybe expand your own urban jungle.
                </p>
              </div>
            </div>
            <div className="row middle-row">
              <div className="col-md-6">
                <h4>Offer your plants in the marketplace</h4>
                <p className="text-muted">
                  Plant lovers have always shared the bounty over the backyard
                  fence or at local garden clubs. But now you can do it online,
                  so you can share and swap, not just with your friends &
                  family, but with people from all over.
                </p>
              </div>
              <div className="col-md-6 how-img">
                <img
                  src="/annie-spratt-ncQ2sguVlgo-unsplash.jpg"
                  class="rounded-circle img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 how-img">
                <img
                  src="/mathyas-kurmann-fb7yNPbT0l8-unsplash.jpg"
                  class="rounded-circle img-fluid"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <h4>Get in contact with other plant lovers</h4>
                <p className="text-muted">
                  When you have found your perfect match, get in contact with it's
                  caretaker and let the swap begin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
