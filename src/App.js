import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import AddPlant from "./pages/AddPlant";
import DetailPage from "./pages/Detailpage";
import SendEmail from "./pages/SendEmail";
import UpdatePlant from "./pages/UpdatePlant";
// import PrivateChat from "./pages/PrivateChat";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/add-plant" component={AddPlant} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/plants/:id/update" component={UpdatePlant} />
          <Route path="/plants/:id" component={DetailPage} />
          {/* <Route path="/chat/private" component={PrivateChat} /> */}
          <Route path="/email/:id" component={SendEmail}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
