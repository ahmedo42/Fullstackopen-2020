import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {createNotification} from '../reducers/notificationReducer'
import { incrementVote } from '../reducers/anecdoteReducer'


const Anecdote = ({anecdote , handleClick}) => {
    return (
        <div>
        {anecdote.content}
        has
            <div>
            {anecdote.votes}
            <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const vote = (anecdote) => {
        dispatch(incrementVote(anecdote))
        dispatch(createNotification(`you voted '${anecdote.content}'`, 5))
    }
    return (
        <div>
        {anecdotes.map(anecdote =>
            <Anecdote key = {anecdote.id} anecdote = {anecdote} handleClick = {() => vote(anecdote)} />
          )}
        </div>
    )
}

export default AnecdoteList