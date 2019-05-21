import React from 'react';
import Home from './pages/Home/index';
import User from './pages/User/index';
import Detail from './pages/Detail/index';
import Personal from './pages/Personal/index';
import Setting from './pages/Setting/index';
import PhonePasswordChange from './components/Setting/PhonePasswordChange';
import Post from './pages/Post/index';
import PostDetail from './pages/PostDetail/index';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/detail",
    component: Detail
  },
  {
    path: "/personal",
    component: Personal
  },
  {
    path: "/setting",
    component: Setting
  },
  {
    path: "/passwordchange",
    component: PhonePasswordChange
  },
  {
    path: "/post",
    component: Post
  },
  {
    path: "/postDetail",
    component: PostDetail
  }
]

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const routeConfig = routes.map((route, i) => {
  return <RouteWithSubRoutes key={i} {...route} />
});
export { routeConfig };