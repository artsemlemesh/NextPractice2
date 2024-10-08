import clientPromise from '@/lib/mongodb';
import Link from 'next/link';
import AddQuotePage from './AddQouteForm';

export default async function Page() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const quotes = await db.collection('qoutes').find({}).toArray();

  return (
    <div>
      <h1>Qoutes</h1>
      <Link style={{ color: 'red' }} href="/">
        Go Back
      </Link>
      <AddQuotePage/>
      {quotes.map((quote) => (
        <div key={quote._id}>
          <Link href={`/qoutes/${quote._id}`}>
            {' '}
            <h2>{quote.qoute}</h2>
          </Link>
          <p>{quote.character_id}</p>
        </div>
      ))}
    </div>
  );
}
