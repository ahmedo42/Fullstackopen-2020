import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const setIndex = (len) =>{
    let index = Math.floor(Math.random() * len)
    setSelected(index)

  }
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVote = votes.reduce(
    (acc, num, idx) => {
      if (num > acc.num) {
        acc.num = num;
        acc.idx = idx;
      }

      return acc;
    },
    { num: 0 }
  );
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <button onClick = {() => addVote()}>vote</button>
      <button onClick = {() => setIndex(props.anecdotes.length)}>next anecdote</button>
      <p>Has {votes[selected]} votes</p>
      <h1>Anecdotes with the most votes</h1>
      <p>{props.anecdotes[maxVote.idx]}</p>
      <p>Has {maxVote.num} votes</p>
    </div>
  )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)