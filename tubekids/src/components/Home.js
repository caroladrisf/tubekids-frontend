import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  nav() {
    if (localStorage.userToken) {
      return (
        <nav className="nav justify-content-center">
          <Link className="nav-item nav-link" to="/account">Account</Link>
          <Link className="nav-item nav-link" to="/profiles">Profiles</Link>
          <Link className="nav-item nav-link" to="/playlist">Playlist</Link>
        </nav>
      )
    } else {
      return (
        <nav className="nav justify-content-center">
          <Link className="nav-item nav-link" to="/register">Register</Link>
          <Link className="nav-item nav-link" to="/login">Login</Link>
        </nav>
      )
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8 mx-auto">
            <div className="jumbotron">
              <h1 className="display-4 text-center text-primary">
                <i className="fas fa-child"></i> Tubekids
              </h1>
              <hr className="my-4"></hr>
              <h3 className="text-center text-muted"><i className="fab fa-youtube mx-1"></i>WELCOME<i className="fas fa-video mx-1"></i></h3>

              { this.nav() }

            </div>
        </div>
      </div>
    );
  }
}

export default Home;
