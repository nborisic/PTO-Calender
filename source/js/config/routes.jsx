import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'views/Home';
import Test from 'views/Test';
import NotFound from 'views/NotFound';


const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  TEST: `${ publicPath }test`,
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ Home } />
    <Route exact path={ routeCodes.TEST } component={ Test } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
