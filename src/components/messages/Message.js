import React from 'react';
import Auth from '../../lib/Auth';

const messageFromUser = (message) => {
  return Auth.getPayload().userId === message.from.id || Auth.getPayload().userId === message.from;
};

const Message = ({ message, deleteMessage }) => {
  return(
    <div className={messageFromUser(message) ? 'message message-from-user' : 'message'}>
      {messageFromUser(message) && <i
        className="fa fa-times-circle delete-message-icon"
        onClick={() => deleteMessage(message.id)}
      ></i>}
      <p className="message-text">{message.text}</p>
    </div>
  );
};

export default Message;
