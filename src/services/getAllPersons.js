import axios from "axios"

const APIURL = 'http://localhost:3001/persons'

function getAll() {
    return fetch(APIURL)
        .then(response => response.json())
        .then(persons => {
            return persons
        })
}

async function createPerson({ name, number, id }) {
    const response = await fetch(APIURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, number, id })
    })
    return response.json()
}

const deletePerson = (id) => {
    console.log(id, 'deletePerson')
    axios.delete(`${APIURL}/${id}`)
}

const updateNumber = (id, name, number) => {

    console.log(id, name, number, 'updateperson')
    console.log(`${APIURL}/${id}`)

    axios.put(`${APIURL}/${id}`, { id, name, number })

}

export { getAll, createPerson, deletePerson, updateNumber }