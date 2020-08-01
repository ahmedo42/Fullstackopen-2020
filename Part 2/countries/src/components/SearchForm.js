import React from 'react'

const SearchForm = (props) =>{
    return (
        <div>
            <h3>filter by name</h3>
            <form onSubmit = {props.results}>
            <input value = {props.term} onChange = {props.search}/>
            </form>
        </div>
    )
  
}

export default SearchForm