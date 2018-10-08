import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass'
import Aux from '../hoc/Auxillary'

export const AuthContext = React.createContext(false);

class App extends Component {

  constructor(props){
    super(props);
    console.log('Inside App.js constructor');
    this.state = {
      persons : [
        {id : 1 ,name:'Mukesh'},
        {id : 2 ,name:'Razdan'}
      ],
      showPersons : false,
      toggleClicked : 0,
      isAuthenticated : false
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
    this.setState( (prevState,props) => {
      return {
      showPersons : !doesShowPerson,
      toggleClicked : prevState.toggleClicked + 1
      }
    });
  } 

  deleteHandler = (index) => {
    const persons = this.state.persons.slice();
    persons.splice(index,1);
    this.setState({persons : persons})
  }

  authenticatedHandler = () =>{
    this.setState({isAuthenticated : true});
  }

  render() {  
    console.log('Inside render method of app class');

    return (
      <Aux>
        <Cockpit showPersonHandler={this.showPersonHandler} authenticatedHandler={this.authenticatedHandler}/>
        <AuthContext.Provider value={this.state.isAuthenticated}>
        { this.state.showPersons ? 
          <div>
            <Persons persons={this.state.persons} changed={this.nameChangeHandler} deleted={this.deleteHandler}
            switched={this.switchNameHandler}/>
          </div> : null
        }
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App,classes.App);
