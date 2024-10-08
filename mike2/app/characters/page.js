import Link from 'next/link';
import clientPromise from '../lib/mongodb';

export default async function Page() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const characters = await db.collection('characters').find({}).toArray();

  return (
    <div>
      <h1>Characters</h1>
      <Link style={{ color: 'red' }} href="/">
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
