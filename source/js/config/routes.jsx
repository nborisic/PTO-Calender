import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'views/Dashboard';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ Dashboard } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
