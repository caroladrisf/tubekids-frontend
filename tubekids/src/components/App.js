import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import Content from './Content';

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
        <Content body={children}/>
      </div>
    );
  }
}

export default App;
