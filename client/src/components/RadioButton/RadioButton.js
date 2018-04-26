import React from "react";
import "./RadioButton.css";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

const radioButton = props => {

	let answerMark = "";
	if (props.correct) {
		answerMark = (
			<i
				className="fas fa-check"
				style={props.answerStatus !== "" ? { display: "inline" } : { display: "none" }}
			/>
		);
	} else if (props.correct === false) {
		answerMark = (
			<i
				className="fas fa-times"
				style={props.answerStatus !== "" ? { display: "inline" } : { display: "none" }}
			/>
		);
	}
	return (
		<Auxiliary>
			{answerMark}
			<input
				onChange={props.change}
				type={props.inputType}
				name={props.groupName}
				value={props.buttonValue}
				checked={props.checkedStatus === props.buttonValue}
			/>
			{/* conditionally renders answers radio buttons (answerText) or question categories radio buttons (buttonValue) */}
			<p className="radio-button-value">
				{props.answerText ? props.answerText : props.buttonValue}
			</p>
		</Auxiliary>
	);
};

export default radioButton;
