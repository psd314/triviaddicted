import React, { Component } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import * as actionTypes from "./store/actions/actionTypes";
import {withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    const token = localStorage.jwtToken;
    if (token) {
      // this.props.onTokenCheck(jwt.decode(token));
    } 
  }

	render() {
		return (
			<div className="App">
				<Layout />
			</div>
		);
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onTokenCheck: event =>
// 			dispatch({
// 				type: actionTypes.SET_CURRENT_USER,
// 				user: event.target.value
// 			})
// 	};
// };

export default withRouter(connect((null, mapDispatchToProps))(App));
// compDidMount - if window.location not empty, set_user

// if guest, check for token, use token for validation and get stats
