import React from "react";
import "./SignUp.css";

const signUp = props => {
	return (
		<div>
			Not a member? Sign Up now
			<br />
			<input
				type="email"
				name="username"
				placeholder="Username"
				onChange={props.change}
				value={props.inputValues.username}
			/>
			<br />
			<input placeholder="Password" type="password" name="password" onChange={props.change} />
			<br />
			<input placeholder="Confirm Password" type="password" name="confirmPassword" onChange={props.change} />
            <div>{props.error}</div>
		</div>
	);
};

export default signUp;
