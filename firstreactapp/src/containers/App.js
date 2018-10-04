import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {

  constructor(props){
    super(props);
    console.log('Inside App.js constructor');
    this.state = {
      persons : [
        {id : 1 ,name:'Mukesh'},
        {id : 2 ,name:'Razdan'}
      ],
      showPersons : false
    }
  }

  componentWillMount(){
    console.log('Inside componentWillMount of App.js')
  }

  componentDidMount(){
    console.log('inside componentDidMount method of app class.');
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

  showPersonHandler = () => {
    const doesShowPerson = this.state.showPersons;
    this.setState({showPersons : !doesShowPerson});
  } 

  deleteHandler = (index) => {
    const persons = this.state.persons.slice();
    persons.splice(index,1);
    this.setState({persons : persons})
  }


  render() {  
    console.log('Inside render method of app class');

    return (
      <div className={classes.App}>
        <Cockpit showPersonHandler={this.showPersonHandler}/>
        { this.state.showPersons ? 
          <div>
            <Persons persons={this.state.persons} changed={this.nameChangeHandler} deleted={this.deleteHandler}
            switched={this.switchNameHandler}/>
          </div> : null
        }
      </div>
    );
  }
}

export default App;
