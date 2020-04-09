import React from 'react';
import {Switch, Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";


class App extends React.Component {
  constructor(){
    super()
  }
  render () {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
        {/* <Route path="/marketplace" component={Marketplace}/> */}

      </Switch>
      <Footer />
    </div>
  )
  }
}
export default App;
