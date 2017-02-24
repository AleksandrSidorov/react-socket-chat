import React, { Component } from 'react'
import io from 'socket.io-client'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      messages: [],
      socket: io('http://localhost:3030')
    }
  }

  componentDidMount() {
    this.state.socket.emit('new-message', 'assa')
  }

  render() {
    return (
      <div>
        <h1>React + Socket.io Chat App</h1>
      </div>
    )
  }
}

export default App
