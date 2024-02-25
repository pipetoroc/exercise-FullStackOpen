import { useState, useEffect } from 'react'
import './App.css'
import Search from './Search'
import { createPerson, deletePerson, getAll } from './services/getAllPersons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    getAll().then(persons => {
      setPersons(persons)
    })
     }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const person = persons.find(person => (person.name).toLowerCase() === newName.toLowerCase())
    if (person) {
      alert(`${newName} is already added to phonebook`)
    } else {

      const personObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString()
      }

      createPerson(personObject).then(newPerson => {
        setPersons((prevPersons) => prevPersons.concat(personObject))
        setNewName('')
        setNewNumber('')
    })
  }
}

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleChangeFilter = (event) => {
    console.log(event.target.value)
    setSearch((event.target.value).toLowerCase())
    }

    const handleDeletePerson = (id, name) =>{
      const confirmDelete = window.confirm(
        `Are you sure? You're going to delete ${name} with id ${id}`
      )

      if(confirmDelete){
        deletePerson(id)
          setPersons((prevPersons) => prevPersons.filter(person => person.id !== id))
        }
      }

  return (
    <>
      <div>
        <h2> Phonebook </h2>
          <Search onChange={handleChangeFilter}/>
          <h2>Add New</h2>
        <form onSubmit={addNewPerson}>
          <label>
            name:
            <input onChange={handlePersonChange} value={newName} />
          </label>
          <label >
            number:
            <input type="number" onChange={handleNumberChange} value={newNumber} />
          </label>
          <button type='submit' > Add </button>
        </form>
        <h2>Numbers</h2>
        <ul>
          {persons.filter(person => person.name.toLowerCase().includes(search))
          .map(person => <li key={person.name}>{person.name} {person.number} 
          <button onClick={() => handleDeletePerson(person.id, person.name)}>
            Delete
          </button> </li>)}
        </ul>
      </div >
    </>
  )
}

export default App
