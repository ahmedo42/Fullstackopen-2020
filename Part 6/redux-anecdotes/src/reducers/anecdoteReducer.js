import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const incrementVote =  (anecdote) =>{
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type:'VOTE',
      data: updatedAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      const toUpdate = state.find(anecdote => anecdote.id === action.data.id)
      const updated = {
        ...toUpdate,
        votes:toUpdate.votes+1
      }
      return state.map(anecdote => anecdote.id === action.data.id ? updated : anecdote )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export default anecdoteReducer