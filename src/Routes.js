import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './Login/Login';
import FriendAdd from './friends/FriendAdd';
import Callback from './Auth/Callback';
import Auth from './Auth/auth';
import history from './Auth/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const Routes = () => (
  <Router history={history} component={Login}>
    <div>
      <Route exact path="/" render={(props) => <Login auth={auth} {...props} />} />
      <Route path="/home" render={(props) => <Login auth={auth} {...props} />} />
      <Route path="/friends" render={(props) =><FriendAdd auth={auth} {...props} />} />
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>
    </div>
  </Router>
);

export default Routes;
