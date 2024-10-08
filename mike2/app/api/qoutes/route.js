import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(){
    try{
        const client = await clientPromise
        const db = client.db('FamilyGuy')
        const qoute = await db.collection('qoutes').find({}).toArray()
        return NextResponse.json(qoute)
    }catch(error){

        return NextResponse.json({error: 'Error fetching qoutes'}, {status: 500})
    }}


export async function POST(req){
    try{
        const client =  await clientPromise
        const db = client.db('FamilyGuy')
        const body = await req.json()
        const result = await db.collection('qoutes').insertOne({character_id: body.character_id, qoute: body.qoute})
        return new NextResponse(JSON.stringify({success: true, result}), {status: 201, headers: {'Content-Type': 'application/json'}})

    } catch(error){
        console.error('Error creating qoute', error)
        return new NextResponse(JSON.stringify({success: false, error: 'Error creating qoute'}), {status: 500, headers: {'Content-Type': 'application/json'}})
    }
}