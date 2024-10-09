import Link from "next/link";

export default function Home() {
  return (
    <>
    <Link href='/characters'> characters</Link>
    <br/>
    <Link href='/qoutes'> qoutes</Link>
    <br/>
    <Link href='/quiz'> quiz</Link>
    </>
  );
}
