import React, { Component } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import * as actionTypes from "./store/actions/actionTypes";
import { withRouter } from "react-router-dom";

class App extends Component {
	componentDidMount() {
		const token = localStorage.jwtToken;
		if (token && (this.props.location !== '/' || this.props.location !== '/authentication')) {
			this.props.history.push('play');
			this.props.onTokenCheck(jwt.decode(token));
		}
	}

	componentDidUpdate() {
		// console.log("history", this.props.history);
		// console.log("location", this.props.location);
		
	}

	render() {
		return (
			<div className="App">
				<Layout />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTokenCheck: token =>
			dispatch({
				type: actionTypes.SET_CURRENT_USER,
				user: token
			})
	};
};

export default withRouter(connect(null, mapDispatchToProps)(App));
// compDidMount - if window.location not empty, set_user

// if guest, check for token, use token for validation and get stats
// if authenticated, push to last history

// click guest -> ? if empty,
// go to server, hash ip address, add to db, return signed jwt, set user and push to /play
// on page load, if not empty, set current user in redux, push to last place in history
