import clientPromise from '@/lib/mongodb';
import Link from 'next/link';

// SSG(server side generation)
export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const characters = await db.collection('characters').find({}).toArray();
  return characters.map((character) => ({
    slug: character.slug, //generate paths for each character's slug
  }));
}

// export async function generateMetadata({ params }) {
//   const client = await clientPromise;
//   const db = client.db('FamilyGuy');
//   const character = await db.collection('characters').findOne({ slug: params.slug });
//   return {
//     title: character.name,
//     description: character.description,
//   };
// }

export default async function Page({ params }) {
  const { slug } = params;

  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const character = await db.collection('characters').findOne({ slug });
  console.log('CHARACTER', character);
  if (!character) {
    return <p>Character not found</p>;
  }
  return (
    <div>
      <h1>{character.name}</h1>
      <p>{character.description}</p>
      <Link href="/characters">back to all char</Link>

    </div>
  );
}



