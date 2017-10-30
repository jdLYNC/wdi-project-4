import React from 'react';
import Axios from 'axios';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from '../../lib/Auth';

class NavBar extends React.Component {

  state = {
    credentials: {
      email: '',
      password: ''
    },
    error: '',
    currentUser: Auth.getCurrentUser()
  };

  handleChange = ({ target: { name, value } }) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    this.setState({ credentials });
  }

  handleSubmit = (e) => {
    console.log('App.js handSubmit running');
    e.preventDefault();
    Axios.post('/api/login', this.state.credentials)
      .then((res) => {
        Auth.setToken(res.data.token);
        Auth.setCurrentUser(res.data.user);
        this.props.history.push(this.props.history.location.pathname);
      })
      .catch(() => {
        console.log('catch block firing');
        Auth.logout();
        this.setState({ error: 'Unrecognized credentials' });
      });
  }

  logout = (e) => {
    e.preventDefault();
    Auth.logout();
    this.props.history.push('/');
  };

  render() {
    console.log(this.state);
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
            {Auth.getCurrentUser() && Auth.getCurrentUser().center && <LinkContainer to="/jobs/new"><NavItem>Post Job</NavItem></LinkContainer>}
            {Auth.isAuthenticated() && <LinkContainer to="/messages"><NavItem>Messages</NavItem></LinkContainer>}
          </Nav>
          {!Auth.isAuthenticated() && <Navbar.Form pullRight>
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl type="email" name="email" placeholder="Enter email" />
                {' '}
                <FormControl type="password" name="password" placeholder="Enter password" />
              </FormGroup>
              {' '}
              <Button type="submit">Login</Button>
            </form>
          </Navbar.Form>}
          {Auth.isAuthenticated() && <Nav pullRight>
            <NavItem onClick={this.logout}>Logout</NavItem>
          </Nav>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
