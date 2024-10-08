
import clientPromise from '@/lib/mongodb';
import Link from 'next/link';
// export const revalidate = 10; // Regenerate the page every 10 seconds
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const quizzes = await db.collection('quiz').find({}).toArray();

  return quizzes.map((quiz) => ({
    id: quiz.id.toString(),
  }));
}

export default async function Page({ params }) {
  const { id } = params;
  console.log(' PARAMS', params);
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const quiz = await db.collection('quiz').findOne({_id: new ObjectId(id) });
  console.log('QUIZ', quiz);

  return (
    <div>
      {/* <h1>Title: {quiz.title}</h1> */}
      <p> Answer: {quiz.correct_answer}</p>
      <Link href='/quiz'>go back</Link>
    </div>
  );
}
