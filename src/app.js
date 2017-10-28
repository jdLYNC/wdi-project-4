import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './components/misc/Routes';

import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
