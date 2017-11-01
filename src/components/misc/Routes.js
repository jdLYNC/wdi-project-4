import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import JobIndex from '../jobs/JobIndex';
import JobsNew from '../jobs/JobsNew';
import JobsEdit from '../jobs/JobsEdit';
import Messages from '../messages/Messages';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <ProtectedRoute exact path="/jobs/new" component={JobsNew} center={true} />
      <ProtectedRoute exact path="/jobs/:id/edit" component={JobsEdit} center={true} />
      <Route exact path="/jobs" component={JobIndex} />
      <ProtectedRoute exact path="/messages" component={Messages} center={false} />
      <ProtectedRoute exact path="/messages/:id" component={Messages} center={false} />
    </Switch>
  );
};

export default Routes;
