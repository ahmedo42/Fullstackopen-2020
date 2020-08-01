import React from 'react'

const Phonebook = (props) => {  
    return(
    <div>
        <form onSubmit={props.add}>
          <div>
            name: <input value = {props.name} onChange={props.nameChange} />
            <br/>
            number: <input value = {props.number} onChange={props.numberChange} />
          </div>
          <div>
            <button type="submit" >add</button>
          </div>
        </form>
      </div>
    )
}
export default Phonebook