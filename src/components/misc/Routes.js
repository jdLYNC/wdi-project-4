import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../general/LandingPage';
import JobIndex from '../jobs/JobIndex';

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/jobs" component={JobIndex} />
    </Switch>
  );
};

export default Routes;
