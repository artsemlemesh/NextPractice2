import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(){
    try{
        const client = await clientPromise
        const db = client.db('FamilyGuy')
        const quiz = await db.collection('quiz').find({}).toArray()
        return NextResponse.json(quiz)
    }catch(error){

        return NextResponse.json({error: 'Error fetching quiz'}, {status: 500})
    }}