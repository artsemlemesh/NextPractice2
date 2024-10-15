import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Quotes App</h1>
            <Link href="/quotes">View Quotes</Link><br/>
            <Link href="/workers">View Workers</Link>
            <Link href="/users">View user</Link>
        </div>
    );
}