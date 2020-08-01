import React from 'react';

const Person =  (props) =>{
    return(
    <p>{props.person.name} {props.person.number} <button onClick = {props.remove} title = {props.person.id}> Delete </button></p>
    )
}

const People = (props) =>{
    return (
        <div>
        {props.people.map(person => <Person person = {person} remove = {props.remove}/>)}
        </div>
    );
}


export default People