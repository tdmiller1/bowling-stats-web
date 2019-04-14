import React, { Component } from 'react';
import App from '../App';

import Button from '@material-ui/core/Button'

class Login extends Component {

  state = {
    email:localStorage.getItem('email').slice(1,localStorage.getItem('email').length-1)
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }
  
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() &&
          <div>
            <div className="header" >
              <Button variant="outlined" className="auth-button"
              onClick={this.logout}>Log Out</Button>
            </div>
            {console.log(this.props)}
            <App email={this.state.email} />
        </div>
        }
        {
          !isAuthenticated() && (
            <div className="container column">{' '}
                <div 
                    style={{ cursor: 'pointer', color:'white' }}
                    onClick={this.login} 
                    className="login-center">
                        Log In
                    {' '}
                </div>
            </div>
          )
        }
      </div>
      );
    }
  }

  export default Login;
