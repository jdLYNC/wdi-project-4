import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import _ from 'lodash';
import styled from 'styled-components';

import MessagesForm from './MessagesForm';
import Message from './Message';

const Background = styled.div`
  z-index: -1;
  width: 100vw;
  height: 92.7vh;
  background-image: url('../../assets/images/marc-doucakis.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

class Messages extends React.Component {

  state = {
    users: [],
    messages: [],
    selectedMessages: [],
    selectedUser: this.props.match.params.id || '',
    newMessage: {
      text: '',
      to: '',
      from: Auth.getPayload().userId,
      read: false
    }
  }

  componentWillMount() {
    if(this.state.selectedUser) {
      Axios
        .get(`/api/users/${this.props.match.params.id}`, {
          headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            users: [res.data],
            selectedUser: res.data
          }, console.log(this.state));
        })
        .catch(err => console.log(err));
    }

    Axios
      .get('/api/messages', {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => {
        let messages = _.orderBy(res.data, ['createdAt'], ['desc']);
        let users = messages.map(message => {
          const user = (message.from.id === Auth.getPayload().userId ? message.to : message.from);
          return user;
        });
        users = this.state.users.concat(users);
        users = _.uniqBy(users, 'id');
        const selectedUser = this.state.selectedUser || users[0];
        messages = _.orderBy(messages, ['createdAt'], ['asc']);
        const selectedMessages = _.filter(messages, message => selectedUser.id === message.from.id || selectedUser.id === message.to.id);
        const newMessage = Object.assign({}, this.state.newMessage, { to: selectedUser });
        this.setState({
          messages: messages,
          selectedUser: selectedUser,
          selectedMessages: selectedMessages,
          users: users,
          newMessage: newMessage
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const newMessage = Object.assign({}, this.state.newMessage, { [(name)]: value });
    this.setState({ newMessage }, console.log(this.state.newMessage));
  }

  handleUserChange = ({ target: { value }}) => {
    const newMessage = Object.assign({}, this.state.newMessage, { to: value });
    this.setState({
      selectedUser: value,
      newMessage
    }, this.filterMessages);
  }

  filterMessages = () => {
    const filteredMessages = _.filter(this.state.messages, message => this.state.selectedUser === message.from.id || this.state.selectedUser === message.to.id);
    this.setState({ selectedMessages: filteredMessages });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/messages', this.state.newMessage,  {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then((res) => {
        const addMessage = this.state.messages.concat([res.data]);
        const addMessageToSelected = this.state.selectedMessages.concat([res.data]);
        const newMessage = Object.assign({}, this.state.newMessage, { text: '' });
        this.setState({ messages: addMessage, selectedMessages: addMessageToSelected, newMessage: newMessage }, this.stickyScroll);
      })
      .catch(err => console.log(err));
  }

  deleteMessageLocal = (id) => {
    this.setState({
      messages: (_.filter(this.state.messages, (message) => message.id !== id)),
      selectedMessages: (_.filter(this.state.selectedMessages, (message) => message.id !== id))
    });
  }

  deleteMessage = (id) => {
    Axios
      .delete(`/api/messages/${id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .catch(err => console.log(err));
    this.deleteMessageLocal(id);
  }

  stickyScroll() {
    const objDiv = document.getElementsByClassName('message-viewer')[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return (
      <Background>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <aside className="messenger">
                <h3>Messenger</h3>
                <div className="form-group">
                  <select
                    name="selectedUser" value={this.state.newMessage.to}
                    onChange={this.handleUserChange}
                    className="form-control">
                    {this.state.users.map(user =>
                      <option key={user.id}
                        value={user.id}>{user.name}</option>)}
                  </select>
                </div>

                <section className="col-sm-12 message-viewer">
                  {this.state.selectedMessages.map((message)=> {
                    return(
                      <Message
                        key={message.id}
                        message={message}
                        deleteMessage={this.deleteMessage}
                      />
                    );
                  })}
                </section>

                <MessagesForm
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  users={this.state.users}
                  message={this.state.newMessage} />
              </aside>
            </div>
          </div>
        </div>
      </Background>
    );
  }
}

export default Messages;
