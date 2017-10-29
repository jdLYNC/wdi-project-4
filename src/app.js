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

  render() {
    return (
      <Router>
        <main>
          <NavBar />
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
