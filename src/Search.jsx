import React from 'react'

function Search({onChange}) {
    return (
        <label>
            filter shown with:
            <input type="text" onChange={onChange}/>
        </label>

    )
}

export default Search