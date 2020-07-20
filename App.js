/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import Router from './src/Router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<Router />);
  }
}


export default App;
