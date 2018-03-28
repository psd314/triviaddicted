import React, { Component } from "react";
import "./Authentication.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import axios from "axios";
// import * as validation from '../../utils/authFormValidation';
import validate from "../../utils/authFormValidation";

class Authentication extends Component {
	state = {
		loginStatus: true,
		username: "",
		password: "",
		confirmPassword: "",
		errors: []
	};

	// componentDidUpdate() {
	// 	console.log(this.state.errors);
	// }

	handleLoginToggle = () => {
		this.setState({ loginStatus: true });
	};

	handleSignUpToggle = () => {
		this.setState({ loginStatus: false });
	};

	handleLoginUser = () => {
		console.log("logging in");
		axios.get("/login/local").then(resp => {
			console.log(resp);
		});
	};

	handleSignUpUser = () => {
		let errors = validate(this.state);		
		this.setState({ errors: errors });

		if (!errors.length) {
			const userInfo = {
				username: this.state.username,
				password: this.state.password
			};
			axios.post("/signup/local", userInfo).then(resp => {
				console.log("signup resp", resp);
			});
		}
	};

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		let form = (
			<Login change={this.handleInputChange} inputValues={this.state} />
		);
		if (this.state.loginStatus === false) {
			form = (
				<SignUp change={this.handleInputChange} inputValues={this.state} />
			);
		}

		let errorMessages = [];
		if (this.state.errors.length) {
			errorMessages = this.state.errors.map(el => {
				return <div key={el}>{el}</div>;
			});
		}

		return (
			<div>
				<div>Login or Sign Up</div>
				{form}
				<br />
				<button
					onClick={
						this.state.loginStatus
							? this.handleLoginUser
							: this.handleLoginToggle
					}
				>
					Log In
				</button>&nbsp;
				<button
					onClick={
						!this.state.loginStatus
							? this.handleSignUpUser
							: this.handleSignUpToggle
					}
				>
					Sign Up
				</button>
				{errorMessages}
			</div>
		);
	}
}

export default Authentication;
