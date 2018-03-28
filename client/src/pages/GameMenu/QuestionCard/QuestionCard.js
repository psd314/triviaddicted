import React from "react";
import "./QuestionCard.css";
import RadioButton from "../../../components/RadioButton/RadioButton";

const questionCard = props => {
	let choices = [];
	let answerChoices = "";
	const parser = new DOMParser();

	if (props.questionInfo.type === "multiple") {
		choices = choices.concat(props.questionInfo.correct_answer);
		choices = choices.concat(props.questionInfo.incorrect_answers);
		//shuffle answers so correct is not always first
		// for (let i = 0; i < choices.length; i++) {
		// 	let rand = Math.floor(Math.random() * choices.length);
		// 	let swap = choices[i];
		// 	choices[i] = choices[rand];
		// 	choices[rand] = swap;
		// }

		answerChoices = choices.map((el, i) => {
			const text = parser.parseFromString(el, 'text/html');
			return (
				<div key={el}>
					<RadioButton
						change={props.change}
						inputType="radio"
						groupName="radioButtonValue"
						buttonValue={text.body.innerHTML}
						answerText={text.body.innerHTML}
						checkedStatus={props.checkedStatus}
					/>
				</div>
			);
		});
	} else {
		choices = ["True", "False"];
		answerChoices = choices.map((el, i) => {
			const text = parser.parseFromString(el, 'text/html');
			return (
				<div key={el}>
					<RadioButton
						change={props.change}
						inputType="radio"
						groupName="radioButtonValue"
						buttonValue={el}
						answerText={text.body.innerHTML}
						checkedStatus={props.checkedStatus}
					/>
				</div>
			);
		});
	}

	let button = <button  onClick={props.submitAnswer}>Submit</button>;
	if (props.answerStatus !== "") {
		button = <button  onClick={props.nextQuestion}>Next Question</button>;
	}

	// Decode special characters from string, a little hacky, maybe replace with 'he' library later
	const dom = parser.parseFromString(props.questionInfo.question, 'text/html');

	return (
		<div className={["question-card", props.answerStatus].join(' ')}>
			<div>Timer: </div>
			<h3>Category: {props.questionInfo.category}</h3>
			<p>{dom.body.innerHTML}</p>
			<div>
				Choices
				<br />
				{answerChoices}
			</div>
			{button}			
		</div>
	);
};

export default questionCard;
