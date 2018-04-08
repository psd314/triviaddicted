import React from "react";

const login = props => {
	return (
		<div>
			Login now
			<br />
			<input
				type="email"
				placeholder="username"
				name="username"
				onChange={props.change}
				value={props.inputValues.username}
			/>
			<br />
			<input
				type="password"
				placeholder="password"
				name="password"
				onChange={props.change}
				value={props.inputValues.password}
			/>
		</div>
	);
};

export default login;
