import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const qoutes = await db.collection('qoutes').find({}).toArray();
  // console.log('QUOTES', qoutes);
  return qoutes.map((qoute) => ({
    id: qoute.id,
  }));
}

export default async function QoutePage({ params }) {
  const { id } = params;
  console.log('ID', id);
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const qoute = await db.collection('qoutes').findOne({ _id: new ObjectId(id) });
    console.log('QUOTE', qoute);
    return (
        <div>
            <h1>Qoute</h1>
            <Link href='/qoutes'><strong>Go Back</strong></Link>

             <h2>QOUTE: {qoute.qoute}</h2>
            <p>Character ID: {qoute.character_id}</p> 
        </div>
    )
}