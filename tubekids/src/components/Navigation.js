import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../services/UserFunctions';

class Navigation extends Component {
  constructor() {
    super();
    this.state = { error: '' };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();

    logout().then(res => {
      if (res.message) {
        localStorage.removeItem('userToken');
        this.props.history.push('/');
      }
    });
  }

  navLinks() {
    if (localStorage.userToken) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/account">Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profiles">Profiles</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/playlist">Playlist</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={this.handleLogout}>Logout</a>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/"><i className="fas fa-child"></i> Tubekids</Link>
            <div className="collapse navbar-collapse">
              { this.navLinks() }
            </div>
          </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
