import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is my first react application.</h1>
        <Person/>
      </div>
    );
    // return React.createElement('div', {className : 'App'}, React.createElement('h1',null,'Does this work now ?'));
  }
}

export default App;
