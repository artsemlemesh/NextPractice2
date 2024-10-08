import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href='characters/'>
      Characters
      </Link>
      <br/>
      <Link href='qoutes/'>
      Qoutes
      </Link>
      <br/>
      <Link href='quiz/'>
      Quiz
      </Link>
      
    </>
  );
}
