import React from "react";
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
		{props.buttonValue}
		<br />
	</Auxiliary>
);

export default radioButton;
