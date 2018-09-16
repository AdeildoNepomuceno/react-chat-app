import React, { Component } from 'react'; 
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from './events';

const socketURL = "localhost:3231"

class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      socket: null,
      user: null,
      nickname: "",
      error: ""
    }

  }

  componentWillMount(){
    this.initSocket();
  }

  initSocket = () => {

    const socket = io(socketURL);

    socket.on('connect', ()=>{
      console.log("connected");
    });

    this.setState({
      socket
    });

  }

  setUser = (user) => {

    const { socket } = this.state;

    socket.emit(USER_CONNECTED, user);

    this.setState({
      user
    });

  }

  beforeSetUser = ( {user, isUser} )=>{

    console.log(user, isUser);

    if(isUser){

      this.setError("Username Taken");

    }else{

      this.setUser(user);

      this.setError("");

    }

  }

  setError = (error) => {

    this.setState({
      error
    });

  }

  logout = () => {

    const { socket } = this.state;

    socket.emit(LOGOUT);

    this.setState({
      user:null
    })

  }

  handleSubmit = (e) => {

    e.preventDefault();
    
    const { socket, nickname } = this.state;

    socket.emit(VERIFY_USER, nickname, this.beforeSetUser);

  }

  handleChange = (e) => {

    e.preventDefault();

    this.setState({
      nickname: e.target.value
    });

  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="App">

        <form onSubmit={this.handleSubmit}>

          <label htmlFor="nickname">

            <h2>Nickname</h2>

          </label>

          <input 
            type="text" 
            ref={ (input) => { this.textInput = input} }
            value={nickname}
            onChange={this.handleChange}
            placeholder="Username"
          />

          <div>
            { error ? error : null}
          </div>

          <input type="submit"/>

        </form>

      </div>
    );
  }

}

export default App;
