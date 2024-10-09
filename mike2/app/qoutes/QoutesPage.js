'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import AddQoutePage from "./AddQouteForm"
import { fetchQoutes } from "../store/features/qouteSlice"

export default function QoutesPage({initialQoutes}){//initialQoutes is the initial data that is passed from the server
    const dispatch = useDispatch()
    const qoutes = useSelector((state) => state.qoutes.qoutes)
    console.log('QOUTES', qoutes)
    useEffect(() => {
        // if(initialQoutes.length > 0){
            dispatch(fetchQoutes(initialQoutes))
        // }
    }, [dispatch, initialQoutes])

    return (
        <div>
            <h1>Qoutes</h1>
            <Link href='/'> Go BACK</Link>
            {/* <AddQoutePage/> */}
            {qoutes.map((qoute) => (
                <div key={qoute._id}>
                    <Link href={`/qoutes/${qoute._id}`}>
                    <p>{qoute.qoute}</p>
                    <br/>
                    </Link>

                </div>
            ))}


        </div>
    )
}