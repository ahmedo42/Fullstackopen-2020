import React , {useState , useEffect} from 'react';
import Phonebook from './components/Phonebook'
import Search from './components/Search'
import People from './components/People';
import Message from './components/Message';
import phoneService from './services/Backend'

const App = () => {
  
  
    const hook = () => {
        phoneService
        .getAll()
        .then(initialPeople => {
          setPeople(initialPeople);
          setDisplay(initialPeople);
        })
    }
    useEffect(hook,[]);
    const [ people, setPeople ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber ,  setNewNumber] = useState('');
    const [searchTerm , setSearchTerm] = useState('');
    const [display , setDisplay] = useState(people)
    const [message , setMessage] = useState('');

    const addPerson = (event) =>{
      event.preventDefault();
      const temp = people.filter(person => person.name == newName);
      if(temp.length !== 0){
        if(newNumber  == ''){
          alert(`${newName} is already in the notebook`);
        }
        else{
           if(window.confirm("want to update phone number")){
            const updatedPerson = {name : newName , number :newNumber};
            console.log(updatedPerson);
            phoneService
            .update(temp[0].id , updatedPerson)
            .then(returnedPerson => {
              setPeople(people.map(p => p.id === returnedPerson.id ? returnedPerson : p));
              setDisplay(people.map(p => p.id === returnedPerson.id ? returnedPerson : p));
              setMessage(`updated ${returnedPerson.name}`);
              setTimeout(() => {
                setMessage(null)
              }, 5000);
            })
           }
           
        }
        setNewName('');
        setNewNumber('');
      }
      else if(newNumber !== ''){
        const person = {
          name : newName,
          number : newNumber,
        }
        phoneService
        .create(person)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson));
          setDisplay(people.concat(returnedPerson));
          setMessage(`created ${returnedPerson.name}`);
            setTimeout(() => {
                setMessage(null)
            }, 5000);
          setNewName(''); 
          setNewNumber('');
        })
      }
      else{
        alert("enter a phone number");
      }
    }

    const removeWithId = (event) => {
      const id = event.target.title;
      if(window.confirm("you really want to delete this?")){
        phoneService
        .remove(id)
        .then(() => {
          let temp = people.find(p => p.id == id).name;
          setMessage(`removed ${temp}`);
          setTimeout(() => {
                setMessage(null)
              }, 5000);
          setDisplay(display.filter(p => p.id != id));
          setPeople(people.filter(p => p.id != id));
        })
      }
    }
    const getResults = (event) => {
      event.preventDefault()
      const results = people.filter(person =>
        person.name.toLowerCase().includes(searchTerm)
      );
      setDisplay(results);
    }
    const handleSearch = (event) =>{
      setSearchTerm(event.target.value);
    }
    const handleNameChange = (event)=>{
      setNewName(event.target.value)
    }

    const handleNumberChange = (event)=>{
      setNewNumber(event.target.value)
    }

    return (
      <div>
      <Message message = {message}/>
      <Search results = {getResults} search = {handleSearch} term = {searchTerm}/>
      <h2>Phonebook</h2>
      <Phonebook add = {addPerson} 
      nameChange ={handleNameChange} 
      numberChange = {handleNumberChange}
      name = {newName}
      number = {newNumber}/>
      <h2>Numbers</h2>
      <People  people = {display} remove = {removeWithId} />
      </div>
    )
}

export default App