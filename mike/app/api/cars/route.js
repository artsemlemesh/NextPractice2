import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('FamilyGuy');
    const cars = await db.collection('cars').find({}).toArray();
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching cars' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('FamilyGuy');
    const body = await req.json();
    const result = await db.collection('cars').insertOne({
      make: body.make,
      model: body.model,
      year: body.year,
      color: body.color,
      price: body.price,
    });
    return new NextResponse(JSON.stringify({ success: true, result }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating car', error);
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Error creating car' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}