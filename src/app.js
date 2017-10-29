import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import Auth from './lib/Auth';

import Routes from './components/misc/Routes';
import NavBar from './components/utilities/NavBar';

import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.scss';

class App extends React.Component {

  state = {
    credentials: {
      email: '',
      password: ''
    },
    error: ''
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
        console.log(res.data.token);
        this.props.history.push('/');
      })
      .catch(() => {
        Auth.logout();
        this.setState({ error: 'Unrecognized credentials' });
      });
  }

  render() {
    console.log(this.state);
    return (
      <Router>
        <main>
          <NavBar
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>
          <Routes />
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
