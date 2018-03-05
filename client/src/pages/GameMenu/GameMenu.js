import React, { Component } from "react";
import "./GameMenu.css";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actionCreators from "../../store/actions/actionCreators";

class GameMenu extends Component {
	componentDidMount() {
		this.props.onFetchCategories();
	}

	render() {

        let arr = "Loading...";
		if (this.props.categories) {
            arr = this.props.categories.map(el => el.name);
        } 

		return (
			<div>
				<h2>Play - Game entry point</h2>
                {arr}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		categories: state.trivia.categories,
		questions: state.trivia.questions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchCategories: () => dispatch(actionCreators.fetchCategories()),
		onFetchQuestions: () => dispatch({ types: actionTypes.FETCH_QUESTIONS })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
