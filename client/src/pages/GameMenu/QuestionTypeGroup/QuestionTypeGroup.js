import React from "react";
import RadioButton from "../../../components/RadioButton/RadioButton";

const questionTypeGroup = props => {
	return (
		<div>
			<h4>{props.title}</h4>
			<RadioButton
				change={props.change}
				inputType="radio"
				groupName={props.groupName}
				buttonValue="any"
				checkedStatus={props.checkedStatus}
			/>
            <RadioButton
				change={props.change}
				inputType="radio"
				groupName={props.groupName}
				buttonValue="multiple"
				checkedStatus={props.checkedStatus}
			/>
            <RadioButton
				change={props.change}
				inputType="radio"
				groupName={props.groupName}
				buttonValue="boolean"
				checkedStatus={props.checkedStatus}
			/>
		</div>
	);
};

export default questionTypeGroup;
