import { useState } from "react"

export const Flashcard = ({question, answer, onDelete}) => {
    console.log(question)
    const [displayAnswer, setDisplayAnswer] = useState(false);
    const toggleAnswer = () => {
        setDisplayAnswer(!displayAnswer);
    };
    
    const deleteCard = () => {
        onDelete({question, answer})
    }

    return (
       <div className="flashcard" onClick={toggleAnswer}>
            <h2 className="usr_question">{question}</h2>
            {displayAnswer && <h2 className="usr_answ">{answer}</h2>}
            <button className="card_btn" onClick={deleteCard}>X</button>
        </div>
    )
}