'use client'
import { useState } from "react"


export default function AnswerItem({answer, correctAnswer}){
    const [feedback, setFeedback] = useState(null)
    const handleClick = () => {
        if(answer === correctAnswer){
            setFeedback('Correct!')
        } else {
            setFeedback('Incorrect!')
        }
    }
   
    return (
        <li onClick={handleClick} style={{cursor: 'pointer'}}>
            {answer} {feedback && <span style={{color: 'green'}}>{feedback}</span>}


        </li>
    )
}