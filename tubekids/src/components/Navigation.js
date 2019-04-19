import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href="/"><i className="fas fa-child"></i> Tubekids</a>
            </div>
        </nav>
    );
  }
}

export default Navigation;
