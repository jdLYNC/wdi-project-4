import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';

const ProtectedRoute = ({ center, component: Component, ...other }) => {
  return (
    <Route {...other} render={props => {
      if (!center && Auth.isAuthenticated()) {
        return <Component {...props}/>;
      } else if (center && Auth.getCurrentUser() && Auth.getCurrentUser().center) {
        return <Component {...props}/>;
      } else {
        return <Redirect to="/" />;
      }
    }}/>
  );
};

export default withRouter(ProtectedRoute);
