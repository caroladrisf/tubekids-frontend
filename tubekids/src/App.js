import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />

        <div className="container my-5">
          <Register />
        </div>

      </div>
    );
  }
}

export default App;
