// 'use client'; //used for client side rendering

import clientPromise from '@/lib/mongodb';
import Link from 'next/link';
// import { useEffect, useState } from 'react';

//SERVER SIDE RENDERING

export default async function Page() {
//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);

 //server side rendering by default
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const characters = await db.collection('characters').find({}).toArray();

  //CLIENT SIDE RENDERING 
//   Fetch characters from the API,
//   data doesnt need to be prerendered 
//   changes frequently and is not needed for SEO
//   useEffect(() => {
//     async function fetchCharacters() {
//       try {
//         const response = await fetch('/api/characters');
//         const data = await response.json();
//         setCharacters(data);
//         // setLoading(false);
//       } catch (error) {
//         console.error(error);
//         // setLoading(false);
//       }
//     }
//     fetchCharacters();
//   }, []);


  

//   if (loading) {
//     return <div>Loading...</div>;
//   }
  return (
    <div>
      <h1>Characters</h1>
      <Link style={{color: 'red'}} href='/'>
      Go Back
      </Link>
      {characters.map((character) => (
        <div key={character._id}>
            <Link href={`/characters/${character.slug}`}>
          <h2>{character.name}</h2>
          </Link>
          <p>{character.description}</p>
        </div>
      ))}
    </div>
  );
}
