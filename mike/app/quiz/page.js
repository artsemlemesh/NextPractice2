import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default async function QuizPage() {

    const client = await clientPromise;
    const db = client.db('FamilyGuy');
    const quizzes = await db.collection('quiz').find({}).toArray();
  return <>
    <h1>Quizzes</h1>
    <Link style={{color: 'red'}} href='/'>
      Go Back
      </Link>
    {quizzes.map((quiz) => (
        <div key={quiz._id}>
            <Link href={`/quiz/${quiz._id}`}>
            <h2>{quiz.title}</h2>
            </Link>
            <p>{quiz.answers.map(answer=>(
                <strong key={answer}>{answer}<br/></strong>
                
            ))}</p>
        </div>
    ))}

  </>
}