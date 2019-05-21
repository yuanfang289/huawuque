import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import Detail from '../page/detail';
import User from '../page/user';
import App from '../App';
ReactDOM.render((
  <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/user" component={User}/>
            <Route path="/detail" component={Detail}/>
        </Switch>
  </Router>
), document.getElementById('root'));