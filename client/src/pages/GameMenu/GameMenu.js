import React, { Component } from "react";
import "./GameMenu.css";
import CategoryDropdown from "./CategoryDropdown/CategoryDropdown";
import DifficultyGroup from "./DifficultyGroup/DifficultyGroup";
import QuestionCard from "./QuestionCard/QuestionCard";
import QuestionTypeGroup from "./QuestionTypeGroup/QuestionTypeGroup";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actionCreators from "../../store/actions/actionCreators";

class GameMenu extends Component {
	state = {
		difficulty: "easy",
		type: "any"
	};

	componentDidMount() {
		// queries trivia api for available categories and stores in global Redux state
		this.props.onFetchCategories();
	}

	componentDidUpdate() {
		console.log("state", this.state);
		console.log("props:", this.props);
	}

	handleGetQuestions = event => {
		const categoryId =
			this.props.categoryId === "33" ? "any" : this.props.categoryId;
		let options = {
			category: categoryId,
			difficulty: this.state.difficulty,
			type: this.state.type
		};
		this.props.onFetchQuestions(options);
	};

	handleRadioChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		// convert questionStatus to state in triviaReducer
		let questionStatus = "No Questions";
		if (this.props.questions.length > 0) {
			questionStatus = this.props.questions.map((el, i) => {
				return (
					<QuestionCard
						key={el + i}
						questionInfo={el}
					/>
				);
			});
		}

		return (
			<div>
				<h2>Play - Test Your Knowledge</h2>
				<CategoryDropdown />
				<br />
				<DifficultyGroup
					title="Difficulty"
					change={this.handleRadioChange}
					groupName="difficulty"
					checkedStatus={this.state.difficulty}
				/>
				<hr />
				<QuestionTypeGroup
					title="Question Type"
					change={this.handleRadioChange}
					groupName="type"
					checkedStatus={this.state.type}
				/>
				<button onClick={this.handleGetQuestions}>Get Your Questions</button>
				<section>{questionStatus}</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		categories: state.trivia.categories,
		questions: state.trivia.questions,
		categoryId: state.trivia.categoryId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchCategories: () => dispatch(actionCreators.fetchCategories()),
		onFetchQuestions: options =>
			dispatch(actionCreators.fetchQuestions(options)),
		onCategoryChange: event =>
			dispatch({ type: actionTypes.UPDATE_CATEGORY, event: event.target.value })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
