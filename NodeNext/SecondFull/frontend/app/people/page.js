import AddPeopleForm from "@/components/AddPeopleForm";
import PeopleList from "@/components/PeopleList";
import Link from "next/link";







export default function UserPage() {

    return (
        <>
        <Link href='/'>back</Link>
        <AddPeopleForm/>
        <PeopleList/>
        <h1>People Page</h1>
        </>
    )
}