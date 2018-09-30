import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    persons : [
      {name:'Mukesh'},
      {name:'Razdan'}
    ],
    user : [
      {name:'Ross Geller'},
      {name:'Monica Geller'}
    ]
  }

  switchNameHandler = (newName) => {
    // alert('clicked!!');
    this.setState(
      {
        persons : [
          {name:newName},
          {name:'Razdan'}
        ]
      }
    );
  }
  
  nameChangeHandler = (event) => {
    this.setState(
      {
        persons : [
          {name: 'Mukesh'},
          {name:event.target.value}
        ]
      }
    );
  }

  usernameChangeHandler = (event) =>{
    this.setState(
      {
        persons : [
          {name:'Mukesh'},
          {name:'Razdan'}
        ],
        user : [
          {name: event.target.value},
          {name:'Monica Geller'}
        ]
      }
    );
  }

  render() {

    const style = {
      backgroundColor : 'white',
      border:'1px solid blue',
      cursor : 'pointer',
      padding : '8px'
    };

    const InputStyle ={
      border:'1px solid blue'
    }

    return (
      <div className="App">
        <h1>This is my first react application.</h1>
        <button style={style} onClick={() => this.switchNameHandler('Ramesh')}>Switch name</button>
        <Person handler={this.switchNameHandler} name={this.state.persons[0].name}>I'm someone you know.</Person>
        <Person handler={this.switchNameHandler} change={this.nameChangeHandler} name={this.state.persons[1].name}>I'm someone you might know.</Person>
        <UserInput InputStyle = {InputStyle} change={this.usernameChangeHandler}/>
        <UserOutput username={this.state.user[0].name} love="Dinosaurs"/>
        <UserOutput username={this.state.user[1].name} love="cleaning"/>
      </div>
    );
    // return React.createElement('div', {className : 'App'}, React.createElement('h1',null,'Does this work now ?'));
  }
}

export default App;
