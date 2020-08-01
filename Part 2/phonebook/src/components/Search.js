import React from 'react'

const Search = (props) =>{
    return (
        <div>
            <h3>filter by name</h3>
            <form onSubmit = {props.results}>
            <input value = {props.term} onChange = {props.search}/>
            </form>
        </div>
    )
  
}

export default Search;