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
		type: "any",
		radioButtonValue: "",
		correctAnswers: 0,
		incorrectAnswers: 0,
		answerStatus: ""
	};

	componentDidMount() {
		// queries trivia api for available categories and stores in global Redux state
		this.props.onFetchCategories();
	}

	componentDidUpdate() {
		// console.log("state", this.state);
		// console.log("props:", this.props);
	}

	handleGetQuestions = event => {
		// this.props.categoryId set by onFetchCategories() in componentDidMount()
		const categoryId =
			this.props.categoryId === "33" ? "any" : this.props.categoryId;
		let options = {
			category: categoryId,
			difficulty: this.state.difficulty,
			type: this.state.type
		};
		this.props.onFetchQuestions(options);
	};

	// decrements questionIndex in Redux to cycle through questions[] (also in Redux, from Trivia API)
	handleNextQuestion = () => {
		this.props.onNextQuestion();

		this.setState({ radioButtonValue: "", answerStatus: "" });
	};

	handleRadioChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleAnswerSubmit = () => {
		const correctAnswer = this.props.questions[this.props.questionIndex]
			.correct_answer;
		if (correctAnswer === this.state.radioButtonValue) {
			const correctCount = this.state.correctAnswers + 1;
			this.setState({ answerStatus: "correct", correctAnswers: correctCount });
		} else {
			const incorrectCount = this.state.incorrectAnswers + 1;
			this.setState({
				answerStatus: "incorrect",
				incorrectAnswers: incorrectCount
			});
		}
	};
	// timer
	// flip card on click, start timer
	// animations
	// database - save stats, sessions
	// database - auth
	// play as a guest

	render() {
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
				<section>
					<h3>
						Questions Remaining:{this.props.questionIndex === -1
							? 0
							: this.props.questionIndex}
					</h3>
					<h4>
						Correct: {this.state.correctAnswers} &nbsp; Incorrect:{" "}
						{this.state.incorrectAnswers}
					</h4>
					<div>
						{/* change this to add one more layer, use next question button to queue question, not automatically load it */}
						{this.props.questionIndex >= 0 ? (
							<QuestionCard
								answerStatus={this.state.answerStatus}
								questionInfo={this.props.questions[this.props.questionIndex]}
								change={this.handleRadioChange}
								checkedStatus={this.state.radioButtonValue}
								submitAnswer={this.handleAnswerSubmit}
								nextQuestion={this.handleNextQuestion}
							/>
						) : "No more questions!!!"}
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		categories: state.trivia.categories,
		questions: state.trivia.questions,
		categoryId: state.trivia.categoryId,
		questionIndex: state.trivia.questionIndex
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchCategories: () => dispatch(actionCreators.fetchCategories()),
		onFetchQuestions: options =>
			dispatch(actionCreators.fetchQuestions(options)),
		onCategoryChange: event =>
			dispatch({
				type: actionTypes.UPDATE_CATEGORY,
				event: event.target.value
			}),
		onNextQuestion: () => dispatch({ type: actionTypes.UPDATE_QUESTION_INDEX })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
