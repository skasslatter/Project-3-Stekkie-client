import React from 'react';
import "../stylesheets/nav.css"

export default class Nav extends React.Component {
    render(){
        return (
            <div className="nav">
                <h1>Stekkie</h1>
                <p>Login</p>
                <p>Signup</p>
            </div>
        )
    }
}