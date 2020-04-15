import React, { PureComponent } from 'react'
import io from 'socket.io-client';
import "./PrivateChat.scss";
import {getUser} from "../utils/auth"
export default class PrivateChat extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            socket: null,
            messages: [],
            message: null,
            recipient: "",
            recipients: ["Yvana", "Sybille", "YvTest"]
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);

    }
    componentDidMount(){
        debugger
        let socket = io("http://localhost:3005");
        socket.emit("user_registration", {username: getUser().username})
        
        this.setState({
            socket
        })
        let fixThis  = this;
        socket.on("message", (message)=> {
            let messageCopy = [...fixThis.state.messages, message];
            fixThis.setState({
                messages: messageCopy
            })
        })

        /// fetch all the users using axios and put htem in the state
    }

    onMessageChange(event){
        this.setState({
            message: event.target.value
        })
    }
    sendMessage(){
        let socket = this.state.socket;

        socket.emit("message", {recipient: this.state.recipient, sender: getUser().username, message: this.state.message});
        let messageCopy = [...this.state.messages, {from: getUser.username, message: this.state.message}];
        this.setState({
            messages: messageCopy
        })
    }
    render() {
        return (
            <div className="private-chat">
                <div className="sidebar">
                    {this.state.recipients.map((recipient)=> 
                        <h1 onClick={()=> {this.setState({recipient})}}>{recipient}</h1>
                    )}
                </div>
                <div className="chat">
                    <div className="messages">
                        {this.state.messages.map((message)=> 
                            <p>{message.message}</p>
                        )}
                    </div>
                    <div className="message">
                    <input type="text" onChange={this.onMessageChange}/>
                    <button onClick={this.sendMessage}>Send</button>
                </div>  
            </div>

            </div>
        )
    }
}
