import React from 'react';
import Axios from 'axios';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from '../../lib/Auth';
import OAuthButton from '../auth/OAuthButton';

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
    const error = '';
    this.setState({ credentials, error });
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
      .catch(err => {
        Auth.logout();
        this.setState({ error: err.response.data });
      });
  }

  logout = (e) => {
    e.preventDefault();
    Auth.logout();
    this.props.history.push(this.props.history.location.pathname);
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
            <form onChange={this.handleChange} onSubmit={this.handleSubmit} noValidate>
              <FormGroup>
                {/* {this.state.error.message {this.state.error.message}} */}

                <FormControl
                  type="email"
                  name="email"
                  placeholder={ this.state.error.field === 'email' ? this.state.error.message : 'Enter email'} />
                {' '}
                <FormControl
                  type="password"
                  name="password"
                  placeholder={ this.state.error.field === 'password' ? this.state.error.message : 'Enter password'} />
              </FormGroup>
              {' '}
              <Button type="submit" disabled={!!this.state.error}>Login</Button>
              <OAuthButton provider="facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></OAuthButton>
            </form>
            {this.state.error.field ? <div className="error-window">
              <small>{this.state.error.message}</small>
            </div> : ''}
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
