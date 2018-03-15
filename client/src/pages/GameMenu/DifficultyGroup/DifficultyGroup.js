import React from "react";
import RadioButton from "../../../components/RadioButton/RadioButton";

const difficultyGroup = props => {
	return (
		<div>
			<h4>{props.title}</h4>
            <RadioButton
				change={props.change}
				inputType="radio"
				groupName={props.groupName}
				buttonValue="easy"
				checkedStatus={props.checkedStatus}
			/>
            <RadioButton
				change={props.change}
				inputType="radio"
				groupName={props.groupName}
				buttonValue="medium"
				checkedStatus={props.checkedStatus}
			/>
            <RadioButton
				change={props.change}
				inputType="radio"
				groupName={props.groupName}
				buttonValue="hard"
				checkedStatus={props.checkedStatus}
			/>
			<RadioButton
				change={props.change}
				inputType="radio"
				groupName={props.groupName}
				buttonValue="any"
				checkedStatus={props.checkedStatus}
			/>
		</div>
	);
};

export default difficultyGroup;
