import React, { useState } from 'react'
import useField from './hooks/useField'
import useCountry from './hooks/useCountry'
import Country from './components/Country'


const App = () => {
  const [name, setName] = useState('')
  const nameInput = useField('text')

  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  return (
    <div>
      <div>
        <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      </div>
      <Country country={country} />
    </div>
  )
}

export default App