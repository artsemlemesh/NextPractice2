import clientPromise from "../lib/mongodb"
import QoutesPage from "./QoutesPage"



export default async function Page(){
    //initial data fetching (SSR)
    const client = await clientPromise
    const db = client.db('FamilyGuy')
    const qoutes = await db.collection('qoutes').find({}).toArray()

    return (
        <div>
            <h1>Qoutes</h1>
            {/* <Link href='/'> Go BACK</Link> */}
            {/* <AddQoutePage/> */}
            <QoutesPage initialQoutes={qoutes}/>
            {/* {qoutes.map((qoute) => (
                <div key={qoute._id}>
                    <Link href={`/qoutes/${qoute._id}`}>
                    <h2>{qoute.character_id}</h2>
                    <p>{qoute.qoute}</p>
                    </Link>
                    
                </div>
            ))} */}
        </div>
    )
}