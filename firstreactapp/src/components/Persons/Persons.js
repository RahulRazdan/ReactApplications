import React from 'react'
import Person from './Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const Persons = (props) => props.persons.map((person,index) => {
    return <ErrorBoundary key={person.id}>
    <Person 
    name={person.name} 
    deleteHandler ={() => props.deleted(index)} 
    handler={props.switched} 
    change={(event) => props.changed(event,person.id)}>
    I'm someone you know.
    </Person>
    </ErrorBoundary>
  });

  export default Persons;