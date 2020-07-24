import React, { useState } from 'react'
import ReactDOM from 'react-dom'




const Button = (props) =>{
   return (
     <button onClick = {props.handleClick}> {props.text} </button>
   )
}

const Statistic = (props) => {
  return ( 
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}
const Statistics = (props) =>{
 if(!props.feedback){
   return(
     <p>No feedback </p>
   )
 }
  return(
    <div>
      <h1>statistics</h1>
      <Statistic text = "good"  value = {props.good}/>
      <Statistic text = "neutral"  value = {props.neutral}/>
      <Statistic text = "bad"  value = {props.bad}/>
      <Statistic text = "all"  value = {props.all}/>
      <Statistic text = "average"  value = {props.average}/>
      <Statistic text = "positive"  value = {props.positive}/>
    </div>
      
  )
      
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [hasFeedBack ,  setFeedBack] = useState(false)
  const total = bad + good + neutral
 
  
  const getAverage = (good ,  bad, total) =>{  
    let avg = (good - bad) / (total);
    if(Number.isNaN(avg)){
      return 0;
    }
    return Math.round(avg*1000)/1000;
  }


const getPostivePercent = (good , total) =>  {
    let pos = (good / total);
    if(Number.isNaN(pos)){
      return 0;
    }
    return Math.round(pos*1000) / 1000;
}
  const positivePercent = getPostivePercent(good,total);
  const average = getAverage(good , bad ,total)
  const StatProps = {
    feedback : hasFeedBack,
    good : good ,
    neutral : neutral,
    bad : bad ,
    all : total,
    average : average,
    positive : positivePercent,
  };
  const setScore = (category , currentValue) => {
    setFeedBack(true)

    if (category === "good"){
      setGood(currentValue+1)
    }
    else if(category === "neutral"){
      setNeutral(currentValue+1)
    }
    else{
      setBad(currentValue+1)
    }

  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => setScore("good",good)} text = "good"/>
      <Button handleClick = {() =>setScore("neutral",neutral)} text = "neutral"/>
      <Button handleClick = {() =>setScore("bad",bad)} text = "bad"/>
      <Statistics {...StatProps} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)