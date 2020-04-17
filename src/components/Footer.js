import "../stylesheets/footer.css";

import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="empty"></div>
        <footer id="sticky-footer">
                    <p className="copyright">© Copyright Yvana and Sybille</p>
        </footer>
      </div>
    );
  }
}
