

import Link from 'next/link';
import clientPromise from '../lib/mongodb';
import FilterChar from './FilterChar';

export default async function Page() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const characters = await db.collection('characters').find({}).toArray();
 
 
 
  //necessary to convert to json, bcz it may include object types like ObjectId
  const jsonCharacters = JSON.parse(JSON.stringify(characters));
//but its now working if i pass it to the component
  

  return (
    <div>
      <h1>Characters</h1>
      <Link style={{ color: 'red' }} href="/">
        Go Back
      </Link>
      <FilterChar characters={characters}/>
      {/* {characters.map((character) => (
        <div key={character._id}>
          <Link href={`/characters/${character.slug}`}>
            <h2>{character.name}</h2>
          </Link>
          <p>{character.description}</p>
        </div>
      ))} */}
    </div>
  );
}
