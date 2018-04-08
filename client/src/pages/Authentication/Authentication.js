import React, { Component } from "react";
import "./Authentication.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import axios from "axios";
// import * as validation from '../../utils/authFormValidation';
import validate from "../../utils/authFormValidation";
import { connect } from "react-redux";
import { login, logout } from "../../store/actions/actionCreators";

class Authentication extends Component {
	state = {
		loginStatus: true,
		username: "me@mail.com",
		password: "password",
		confirmPassword: "",
		errors: []
	};

	handleLoginToggle = () => {
		this.setState({ loginStatus: true });
	};

	handleSignUpToggle = () => {
		this.setState({ loginStatus: false });
	};

	handleLoginUser = () => {
		let errors = validate(this.state);
		this.setState({ errors: errors });
		if (!errors.length) {
			const userInfo = {
				email: this.state.username,
				password: this.state.password
			};
			this.props.login(userInfo).then(resp => {
				this.props.history.push("/play");
			});
		}
	};

	handleSignUpUser = () => {
		let errors = validate(this.state);
		this.setState({ errors: errors });

		if (!errors.length) {
			const userInfo = {
				email: this.state.username,
				password: this.state.password
			};
			axios.post("/signup/local", userInfo).then(resp => {
				console.log(resp.data);
				if (resp.data === true) {
					// add notification that signup was successful and to log in
					this.setState({ loginStatus: true, username: "", password: "" });
				} else {
					let errors = [resp.data.message];
					this.setState({ errors: errors });
				}
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
				<br />
				<button onClick={this.props.logout}>Logout</button>
				<br />
				<button onClick={() => alert("Be our guest.")}>
					Play as Guest
				</button>
				{errorMessages}
			</div>
		);
	}
}

export default connect(null, { login, logout })(Authentication);
