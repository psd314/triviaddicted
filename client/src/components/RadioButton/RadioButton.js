import React from "react";
import './RadioButton.css';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

const radioButton = props => (
	<Auxiliary>
		<input
			onChange={props.change}
			type={props.inputType}
			name={props.groupName}
			value={props.buttonValue}
			checked={props.checkedStatus === props.buttonValue}
		/>
		{/* conditionally renders answers radio buttons (answerText) or question categories radio buttons (buttonValue) */}
		<p className="radio-button-value">{props.answerText ? props.answerText : props.buttonValue}</p>
	</Auxiliary>
);

export default radioButton;
