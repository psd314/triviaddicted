import React from 'react';
import './QuestionCard.css';

const questionCard = props => {
    const choices = [];
    if (props.questionInfo.type === "multiple") {
        console.log(true);
    }

    return (
        <div className="question-card">
            <div>Timer: </div>
            <h3>Category: {props.questionInfo.category}</h3>
            <p>{props.questionInfo.question}</p>
            <div>Choices</div>
            <button>Next Question</button>
        </div>
    );
}

export default questionCard;