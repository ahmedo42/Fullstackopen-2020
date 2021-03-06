import React from 'react'

const Message = (props) => {
  let MessageStyle  = {
    color : 'green',
    fontSize : 20,
    textAlign : 'center',
  }
  if(props.message !== '' && props.message !== null){
    MessageStyle.border = 'solid'
  }
  if(props.message.startsWith('Wrong')){
    MessageStyle.color = 'red'
  }
  return(
    <div style = {MessageStyle}>
      <p>{props.message}</p>
    </div>
  )
}

export default Message