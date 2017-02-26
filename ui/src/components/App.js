import React, { Component } from 'react'
import io from 'socket.io-client'

import Message from './Message'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      name: null,
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
    this.setState({ name })
  }

  handleMessageSubmit = (event) => {
    event.preventDefault()
    const msgText = this.state.inputValue
    const name = this.state.name ? this.state.name : "Anonymous"
    const datetime = new Date().getTime()
    const msg = { msgText, name, datetime }
    this.state.socket.emit('new-message', msg)
    this.setState({ inputValue: '' })
  }

  render() {
    const { messages, name } = this.state
    let nameBlock = null
    if (!name) {
      nameBlock = (
        <div className="form-place--white">
          <div className="form__textarea--wrapper">
            <input className="form__textarea" type="text" placeholder="anonymous" ref={(input) => { this.nameInput = input}} />
          </div>
          <button
            className="form-place-button-name"
            type="submit"
            onClick={this.handleNameSubmit}
          >
            Set Name
          </button>
        </div>
      )
    } else {
      nameBlock = (
        <div className="name_block">
          <strong>{name}</strong>
        </div>
      )
    }
    return (
      <div className="container">
        <h1>React + Socket.io Chat App</h1>
        <div className="section">
          <div className="section-head">
            {nameBlock}
          </div>
          <div className="messages">
            {messages.map((message, index) => {
              return <Message key={index} message={message} />
            })}
          </div>
          <div className="form-place">
            <div className="form__textarea--wrapper">
              <textarea
                className="form__textarea"
                rows="1"
                type="text"
                value={this.state.inputValue}
                onChange={this.handleInputChange} />
            </div>
            <button
              className="form-place-button"
              type="submit"
              onClick={this.handleMessageSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
