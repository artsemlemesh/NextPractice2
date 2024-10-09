import Link from 'next/link';
import clientPromise from '../lib/mongodb';
import AnswerItem from './AnswerItem';
//this page rerenders every 10 seconds
export const revalidate = 10;

export default async function Quiz() {
  const client = await clientPromise;
  const db = client.db('FamilyGuy');
  const quizzes = await db.collection('quiz').find({}).toArray();

  return (
    <>
      <h1>Quiz</h1>
      <Link href="/"> Go BACK</Link>

      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <Link href={`/quiz/${quiz._id}`}>
            <h2>{quiz.title}</h2>{' '}
          </Link>

          <ul>
            {quiz.answers.map((answer, index) => (
              <AnswerItem
                key={index}
                answer={answer}
                correctAnswer={quiz.correct_answer}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
