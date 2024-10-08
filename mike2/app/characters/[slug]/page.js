import Link from "next/link";

const { default: clientPromise } = require("@/app/lib/mongodb");


async function fetchCharacterBySlug(slug){
    const client = await clientPromise;
    const db = client.db('FamilyGuy');
    const character = await db.collection('characters').findOne({ slug });
    return character;
}

export async function generateStaticParams(){
    const client = await clientPromise
    const db = client.db('FamilyGuy');
    const characters = await db.collection('characters').find({}).toArray();
    return characters.map((character) => ({
        slug: character.slug, //generate static params(paths) for each character
    }));
}


export default async function Page({params}){
    const {slug} = params;
    const character = await fetchCharacterBySlug(slug);

    if (!character){
        return <div>Character not found</div>
    }

    return (
        <div>
            <h1>{character.name}</h1>
            <p>{character.description}</p>
            <Link href="/characters">Back to Characters</Link>
        </div>
    )
}