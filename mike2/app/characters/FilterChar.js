'use client'
import Link from "next/link"
import { useState } from "react"

export default function FilterChar({characters}){
    const [filter, setFilter] = useState('')
    const [filteredCharacters, setFilteredCharacters] = useState(characters)

    const handleFilterChange = (e) => {
        const value = e.target.value
        setFilter(value)
        const filtered = characters.filter((character) => character.name.toLowerCase().includes(value.toLowerCase()))
        setFilteredCharacters(filtered)

    }
    
    return(
        <div>
            <h1>Filter Characters</h1>
            <input
                type="text"
                placeholder="Filter characters"
                value={filter}
                onChange={handleFilterChange}
            />
            <ul>
                {filteredCharacters.map((character) => (
                    <li key={character._id}>
                        <Link href={`/characters/${character.slug}`}><h2>{character.name}</h2></Link>
                        
                        <p>{character.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}