import React, { Component } from 'react'
import io from 'socket.io-client'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      name: null,
      users: [],
      messages: [],
      socket: io('http://localhost:3030')
    }
  }

  componentDidMount() {
    this.state.socket.on('recieve-message', msg => {
      var messages = this.state.messages
      messages.push(msg)
      this.setState({ messages })
    })
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  handleNameSubmit = () => {
    const name = this.nameInput.value
    console.log(name)
    this.setState({ name })
  }

  handleMessageSubmit = (event) => {
    event.preventDefault()
    const msg = this.state.inputValue
    const name = this.state.name
    this.state.socket.emit('new-message', msg)
    this.setState({ inputValue: '' })
  }

  render() {
    const { messages, name } = this.state
    let nameBlock = null
    if (!name) {
      nameBlock = (
        <div>
          <input type="text" placeholder="anonymous" ref={(input) => { this.nameInput = input}} />
          <button type="submit" onClick={this.handleNameSubmit}>Set Name</button>
        </div>
      )
    } else {
      nameBlock = (
        <div>
          <strong>{name}</strong>
        </div>
      )
    }
    return (
      <div>
        <h1>React + Socket.io Chat App</h1>
        <div>
          <ul>
            {messages.map((message, index) => {
              return <li key={index}>{message}</li>
            })}
          </ul>
        </div>
        {nameBlock}
        <div>
          <input type="text" value={this.state.inputValue} onChange={this.handleInputChange} />
          <button type="submit" onClick={this.handleMessageSubmit}>Send</button>
        </div>
      </div>
    )
  }
}

export default App
