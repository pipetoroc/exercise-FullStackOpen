import axios from "axios"

const APIURL = 'http://localhost:3001/persons'

function getAll (){
    return fetch(APIURL)
        .then(response => response.json())
        .then(persons => {
            return persons
        })
}

async function createPerson({name, number, id}){
    const response = await fetch (APIURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, number, id})
    })
    return response.json()
}

const deletePerson = (id) => {
    console.log(id, 'deletePerson')
    axios.delete(`${APIURL}/${id}`)

    .then(response => {
        console.log('Resource deleted successfully:', response.data);
      })
}

export { getAll, createPerson, deletePerson }