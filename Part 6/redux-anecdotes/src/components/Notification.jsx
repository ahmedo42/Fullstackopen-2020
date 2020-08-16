import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications.message)
  const style =
  notification.length !== 0
    ? {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
      }
    : { display: 'none' }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification