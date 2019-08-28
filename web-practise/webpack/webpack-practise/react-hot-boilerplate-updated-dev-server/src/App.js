import React, { Component } from 'react';
import Home from './Home'

export default class App extends Component {
  render() {
      console.log('render App')

    return (
        <div>
            <Home />
            <h1>APP.</h1>
        </div>

    );
  }
}
