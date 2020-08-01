
import React from 'react';


const Course = (props) => {
    return (
      <div>
      <h1>{props.course.name}</h1>
       {props.course.parts.map(part => <p>{part.name} {part.exercises}</p>)}
       <b>total of {props.course.parts.reduce((a,b) => a+b.exercises,0)} exercises</b>
      </div>
      
    )
}

export default Course ;