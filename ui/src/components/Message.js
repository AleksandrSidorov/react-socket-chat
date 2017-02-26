import React, { Component } from 'react'
import moment from 'moment'

import './Message.css'

class Message extends Component {
  toRecent = (date) => moment(date).fromNow()
  render() {
    const { name, msgText, datetime } = this.props.message
    return (
      <div className="message">
        <div className="message__avatar">
          <span className="glyphicon glyphicon-user media-object" aria-hidden="true"></span>
        </div>
        <div className="message__info">
          <div className="message__date">{this.toRecent(datetime)}</div>
          <div className="message__username">{name}</div>
          <div className="message__text">{msgText}</div>
        </div>
      </div>
    )
  }
}

export default Message
