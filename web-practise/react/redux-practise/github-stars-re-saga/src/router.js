import { Router, Route } from 'dva/router';
import React from 'react';
import App from './containers/App';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
}
