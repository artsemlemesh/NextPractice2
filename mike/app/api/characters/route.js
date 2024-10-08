import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';



export async function GET(){
    try{
        const client = await clientPromise
        const db = client.db('FamilyGuy')
        const characters = await db.collection('characters').find({}).toArray()
        return NextResponse.json(characters)
    }catch(error){

        return NextResponse.json({error: 'Error fetching characters'}, {status: 500})
    }
}