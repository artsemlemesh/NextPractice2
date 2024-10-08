import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const qoutes = await db.collection('qoutes').find({}).toArray();

  return qoutes.map((qoute) => ({
    id: qoute.id,
  }));
}


export default async function QoutePage({params}){
    const {id} =params
    const client = await clientPromise
    const db= client.db('FamilyGuy')
    const qoute = await db.collection('qoutes').findOne({_id: new ObjectId(id)})

    return (
        <div>
            <h1>Qoute</h1>
            <Link href='/qoutes'>GO BACK</Link>
            <h2>{qoute.character_id}</h2>
            <p>{qoute.qoute}</p>
        </div>
    )
}
