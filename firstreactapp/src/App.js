import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent'
import Radium, { StyleRoot } from 'radium'

class App extends Component {
  state = {
    persons : [
      {id : 1 ,name:'Mukesh'},
      {id : 2 ,name:'Razdan'}
    ],
    user : [
      {name:'Ross Geller'},
      {name:'Monica Geller'}
    ],
    showPersons : false,
    showUsers : false,
    inputLength : 0,
    inputValue : ''
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
  
  nameChangeHandler = (event,id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    
    person.name = event.target.value;
    const statePerson = this.state.persons.slice();
    statePerson[personIndex] = person;
    this.setState({persons : statePerson });
  }
  
  showUserHandler = () => {
    const doesShowUser = this.state.showUsers;
    this.setState({showUsers : !doesShowUser});
  } 

  showPersonHandler = () => {
    const doesShowPerson = this.state.showPersons;
    this.setState({showPersons : !doesShowPerson});
  } 

  usernameChangeHandler = (event) =>{
    this.setState(
      {
        user : [
          {name: event.target.value},
          {name:'Monica Geller'}
        ]
      }
    );
  }

  deleteHandler = (index) => {
    const persons = this.state.persons.slice();
    persons.splice(index,1);
    this.setState({persons : persons})
  }

  deleteCharHandler = (index) => {
    const chars = this.state.inputValue.split('');
    chars.splice(index,1);    
    this.setState({
      inputValue : chars.join(''),
      inputLength : chars.join('').length
    })
  }

  getStringLengthHandler = (event) =>{
    const string = event.target.value;

    this.setState({
      inputLength : string.length,
      inputValue : string
    });
  }
  render() {

    const style = {
      backgroundColor : 'green',
      color: 'white',
      border:'1px solid blue',
      cursor : 'pointer',
      padding : '8px',
      ':hover' : {
        backgroundColor : 'lightgreen',
        color:'black'
      }
    };

    const InputStyle ={
      border:'1px solid blue'
    }

    let users = null;

    if(this.state.showUsers){
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor : 'salmon'
      };
      users = (
        <div>
        <UserInput InputStyle = {InputStyle} change={this.usernameChangeHandler}/>
        <UserOutput username={this.state.user[0].name} love="Dinosaurs"/>
        <UserOutput username={this.state.user[1].name} love="cleaning"/>
        </div> 
      );
    }

    const classes = [];

    if(this.state.inputLength <=5){
      classes.push('red');
    }

    if (this.state.inputLength >5){
      classes.push('green');
    }

    return (
      <StyleRoot>
      <div className="App">
        <h1>This is my first react application.</h1>
        <button style={style} key="person" onClick={this.showPersonHandler}>Show Person</button>&nbsp;
        <button style={style} key="user" onClick={this.showUserHandler}>Show Users</button>
        <br/>
        { this.state.showPersons ? 
          <div>
            <button style={style} key="name" onClick={() => this.switchNameHandler('Ramesh')}>Switch name</button>
            {/* <Person handler={this.switchNameHandler} 
            name={this.state.persons[0].name}>I'm someone you know.
            </Person>
            <Person handler={this.switchNameHandler} 
            change={this.nameChangeHandler} 
            name={this.state.persons[1].name}>I'm someone you might know.
            </Person> */
            this.state.persons.map((person,index) => {
              return <Person 
              name={person.name} 
              deleteHandler ={() => this.deleteHandler(index)} 
              handler={this.switchNameHandler} 
              change={(event) => this.nameChangeHandler(event,person.id)} 
              key={person.id}>
              I'm someone you know.
              </Person>
            })
            }
          </div> : null
        }
        <br/>
        {users}
        <br/><br/><br/>
        <input type="text" onChange={this.getStringLengthHandler} value={this.state.inputValue}/>
        <p className={classes.join(' ')}>Length of input : {this.state.inputLength}</p>
        <ValidationComponent inputLength={this.state.inputLength}/>
        {
          this.state.inputValue.split('').map((char,index)=>{
            return <CharComponent deleteHandler ={() => this.deleteCharHandler(index)}  char={char} key={index}/>
          })
        }
      </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className : 'App'}, React.createElement('h1',null,'Does this work now ?'));
  }
}

export default Radium(App);
