import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <div className="container">
              <a className="navbar-brand" href="/"><i className="fas fa-child"></i> Tubekids</a>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Account</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Profiles</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Playlist</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
    );
  }
}

export default Navigation;
