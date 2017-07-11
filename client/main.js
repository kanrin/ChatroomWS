import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Index from './apps/Component/Index'

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Index}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById('chat'))
