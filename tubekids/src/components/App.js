import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';

import './App.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const {children} = this.props;

    return (
      <div className="App">
        <Navigation />
        
        <div className="container my-5">
          {children}
        </div>
      </div>
    );
  }
}

export default App;
