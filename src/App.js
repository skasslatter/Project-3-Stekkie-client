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


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    axios.get("http://localhost:3000/")
     .then(response => {
       let users = response.data
       console.log(users)
       this.setState({users: users})
     })
}
  render () {
    let users = this.state.users
  return (
    <div className="App">
      <Nav />
        {users.map((user) => {
          return (
            <h1>{user.name}</h1>
          )
        })}
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
      </Switch>
      <Footer />
    </div>
  )
  }
}
export default App;
