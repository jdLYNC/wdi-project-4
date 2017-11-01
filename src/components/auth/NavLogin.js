import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import OAuthButton from './OAuthButton';

class NavLogin extends React.Component {

  state = {
    credentials: {
      email: '',
      password: ''
    },
    currentUser: Auth.getCurrentUser(),
    error: ''
  };

  handleChange = ({ target: { name, value } }) => {
    const credentials = Object.assign({}, this.state.credentials, { [name]: value });
    const error = '';
    this.setState({ credentials, error });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('/api/login', this.state.credentials)
      .then(res => {
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
    return (
      <div>

        { !Auth.isAuthenticated() &&
          <Navbar.Form pullRight>
            <form onChange={this.handleChange} onSubmit={this.handleSubmit} noValidate>

              <FormGroup>
                <FormControl
                  type="email"
                  name="email"
                  placeholder={ this.state.error.field === 'email' ? this.state.error.message : 'Enter email'} />
                {' '}
                <FormControl
                  type="password"
                  name="password"
                  placeholder={ this.state.error.field === 'password' ? this.state.error.message : 'Enter password'} />
              </FormGroup> {' '}

              <Button type="submit" disabled={!!this.state.error}>Login</Button>

              <OAuthButton provider="facebook">
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
              </OAuthButton>

            </form>

            { this.state.error.field ?
              <div className="error-window">
                <small>{this.state.error.message}</small>
              </div> : ''}

          </Navbar.Form>
        }

        { Auth.isAuthenticated() &&
          <Nav pullRight>
            <NavItem onClick={this.logout}>Logout</NavItem>
          </Nav> }
      </div>
    );
  }
}

export default withRouter(NavLogin);
