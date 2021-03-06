import auth0 from 'auth0-js';

import history from './history';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'tuckermillerdev.auth0.com',
    clientID: 'Otg8g3tLLbeDgj8KsXhyyuzQgYR006Bq',
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/callback' : window.location.href + 'callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession = (authResult) => {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if(profile){
        localStorage.setItem('profile', JSON.stringify(profile))
        if(profile.email){
          localStorage.setItem('email', JSON.stringify(profile.email))
          var url = ""
          if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
              url = `http://localhost:3001/users/add?id=${profile.email}&name=${profile.name}`;
          } else {
              url = `https://bowling-stats-server.herokuapp.com/users/add?id=${profile.email}&name=${profile.name}`;
          }
          fetch(url).then(response => {
            history.push({
            pathname: '/home',
            state: {
              email: profile.email
            }
          })
          })
        }
      }
    })
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    localStorage.removeItem('email');
    history.replace('/');
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
