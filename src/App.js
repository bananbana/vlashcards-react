
import { useState, useEffect } from 'react';
import './App.css';
import { Flashcard } from './components/Flashcard';

function App() {

const [displayForm, setDisplayForm] = useState(false);
const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards")) ?? []);

useEffect(() => {
    console.log('cards changed', cards);
    localStorage.setItem('cards', JSON.stringify(cards));
}, [cards]);

const showForm = () => {
    setDisplayForm(true);
};

const hideForm = () => {
    setDisplayForm(false);
};

const createCard = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event);

    const card = {
        question: event.target[0].value,
        answer: event.target[1].value,
        displayAnswer: false
    };
    setCards([...cards, card]);

    event.target[0].value = '';
    event.target[1].value = '';
};

const removeCard = (card) => {
    setCards(cards.filter((item) => {
        return !(item.question === card.question && item.answer === card.answer);
    }));
}

const deleteAllCards = () => {
    setCards([]);
}

  return (<>
    <header>
        <div className="container">
            <div id="header">
                <h2>Flashcards</h2>
                <div>
                    <button id="add" onClick={showForm}>Add Card</button>
                    <button id="del" onClick={deleteAllCards}>Delete All Cards</button>
                </div>
            </div>
        </div>
    </header>
    {displayForm ? (<form className="create_field" onSubmit={(event) => createCard(event)}>
        <h1>Create Flashcard</h1>
        <br/>
        <label for="question">Question</label>
        <br/>
        <input id="question" type="text"/>
        <br/>
        <label for="answer">Answer</label>
        <br/>
        <input id="answer" type="text"/>
        <br/>
        <button id="save" type="submit">Save</button>
        <button id="close" onClick={hideForm}>Close</button>
    </form>) : <></>}
    <div className="flashcards">
        {cards.map(card => <Flashcard key={card.question + card.answer} question={card.question} answer={card.answer} onDelete={removeCard}/>)}
    </div>
    </>
  );
}

export default App;
