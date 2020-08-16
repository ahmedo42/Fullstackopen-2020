
export const createNotification = (message, time) => {
    return async dispatch => {
      const newNotif = { message: message, time: time }
      dispatch({
        type: 'SET_NOTIF',
        data: newNotif,
      })
      await setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIF',
        })
      }, time * 1000)
    }
}
export const clearNotification = () => {
    return {
      type: 'CLEAR_NOTIF',
    }
}

const initialState = {
    message: '',
    time: 0,
  }
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIF':
        return { message: action.data.message, time: action.data.time }
  
      case 'CLEAR_NOTIF':
        return initialState
  
      default:
        return state
    }
  }

export default notificationReducer