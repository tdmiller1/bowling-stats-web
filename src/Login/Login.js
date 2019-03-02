import React, { Component } from 'react';
import App from '../App';

class Login extends Component {
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
            <div 
                className="container column" 
                style={{ cursor: 'pointer' }}
                onClick={this.logout}>
                    Log Out
            </div>
            <App />
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
