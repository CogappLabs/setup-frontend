import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = 'wss://launch-frontend.fly.dev';
const LOCAL = '/';


class App extends Component {

  state = {
    socket: socketIOClient(ENDPOINT),
      local: socketIOClient(LOCAL),
    room: '',
      screenNum: ''
  }

    assignRoom = data => {
        this.state.socket.emit("joinRoom", this.state.room);
        this.state.local.emit("joinRoomLocal", this.state.room);
    }

    assignScreen = data => {
        this.state.socket.emit("setScreen", this.state.screenNum);
        this.state.local.emit("setScreenLocal", this.state.screenNum);
    }

  render() {
    return (
        <div className="App">
            <div onSubmit={this.assignRoom}>
                Location:
                <label htmlFor="room">
                    <input
                        type="text"
                        id={'room'}
                        placeholder={'Enter location name...'}
                        value={this.state.room}
                        onChange={e => this.setState({ room: e.target.value })}
                    />
                </label>
                <button type="button" onClick={this.assignRoom}>
                    Create location
                </button>
            </div>
            <div onSubmit={this.assignScreen}>
                Screen Number:
                <label htmlFor="room">
                    <input
                        type="text"
                        id={'screenNumber'}
                        placeholder={'Enter screen number...'}
                        value={this.state.screenNum}
                        onChange={e => this.setState({ screenNum: e.target.value })}
                    />
                </label>
                <button type="button" onClick={this.assignScreen}>
                    Connect screen
                </button>
            </div>
        </div>
    );
  };
}

export default App;

