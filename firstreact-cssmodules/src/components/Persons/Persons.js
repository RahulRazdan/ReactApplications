import React,{Component} from 'react'
import Person from './Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

class Persons extends Component {

  constructor(props){
    super(props);
    console.log('Inside Persons.js constructor');
  }

  componentWillMount(){
    console.log('Inside componentWillMount of Persons.js')
  }

  componentDidMount(){
    console.log('inside componentDidMount method of Persons class.');
  }

  componentWillReceiveProps (props){
    console.log('[UPDATE] inside componentWillReceiveProps method of Persons class.',props);
  }

  shouldComponentUpdate (nextProps,state){
    console.log('[UPDATE] inside shouldComponentUpdate method of Persons class.',nextProps,state);
    return true;
  }

  componentWillUpdate(nextProps,state){
    console.log('[UPDATE] inside componentWillUpdate method of Persons class.',nextProps,state);
  }

  componentDidUpdate (){
    console.log('[UPDATE] inside componentDidUpdate method of Persons class.');
  }
  render () {
    console.log('inside render method of class persons');

    return (this.props.persons.map((person,index) => { return <ErrorBoundary key={person.id}>
    <Person 
    name={person.name} 
    deleteHandler ={() => this.props.deleted(index)} 
    index={index}
    handler={this.props.switched} 
    change={(event) => this.props.changed(event,person.id)}>
    I'm someone you know.
    </Person>
    </ErrorBoundary>
     }));
  }
}
 
 export default Persons;