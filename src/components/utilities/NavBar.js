import React from 'react';
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from '../../lib/Auth';
import NavLogin from '../auth/NavLogin';
import Axios from 'axios';

class NavBar extends React.Component {

  state = {};

  checkMessages() {
    if(Auth.isAuthenticated()) {
      Axios.get('/api/messages',  {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
        .then(res => {
          const unreadMessages = res.data.filter(message => {
            return !message.read && message.to.id === Auth.getPayload().userId;
          });
          this.setState({ unreadMessages });
        });
    }
  }


  render() {
    this.checkMessages();

    return(
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Diveboard</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>

          <Nav>
            <LinkContainer to="/jobs"><NavItem>Jobs</NavItem></LinkContainer>
            { Auth.getCurrentUser() && Auth.getCurrentUser().center &&
              <LinkContainer to="/jobs/new">
                <NavItem>Post Job</NavItem>
              </LinkContainer> }
            { Auth.isAuthenticated() &&
              <LinkContainer to="/messages">
                <NavItem>Messages { this.state.unreadMessages && this.state.unreadMessages.length > 0 && <Badge>{this.state.unreadMessages.length}</Badge> }</NavItem>
              </LinkContainer> }
          </Nav>

          <NavLogin />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
