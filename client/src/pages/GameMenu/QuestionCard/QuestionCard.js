import React, { Component } from "react";
import "./QuestionCard.css";
import RadioButton from "../../../components/RadioButton/RadioButton";

class QuestionCard extends Component {
	state = {
		timer: 3,
		intervalID: -1,
		flip: false
	};

	componentDidMount() {}

	componentDidUpdate() {
		if (this.state.timer === 0) {
			clearInterval(this.state.intervalID);
			this.setState({ timer: "--", intervalID: -1 });
			this.props.submitAnswer();
		}
	}

	handleStartTimer = () => {
		if (this.props.questionIndex > 0) {
			let intervalID = setInterval(() => {
				let time = this.state.timer - 1;
				this.setState({ timer: time });
			}, 1000);
			this.setState({ timer: 3, intervalID: intervalID });
		}
	};

	handleNextQuestion = () => {
		clearInterval(this.state.intervalID);
		this.props.nextQuestion();
		this.setState({ timer: 3, flip: false });
	};

	handleCardFlip = () => {
		let flipStatus = !this.state.flip;
		this.setState({ flip: flipStatus });
		this.handleStartTimer();
	};

	render() {
		let choices = this.props.choices;
		let answerChoices = "";
		const parser = new DOMParser();

		if (this.props.questionInfo.type === "multiple") {
			answerChoices = choices.map((el, i) => {
				const text = parser.parseFromString(el, "text/html");
				return (
					<div key={el}>
						<RadioButton
							change={this.props.change}
							inputType="radio"
							groupName="radioButtonValue"
							buttonValue={text.body.innerHTML}
							answerText={text.body.innerHTML}
							checkedStatus={this.props.checkedStatus}
						/>
					</div>
				);
			});
		} else {
			choices = ["True", "False"];
			answerChoices = choices.map((el, i) => {
				const text = parser.parseFromString(el, "text/html");
				return (
					<div key={el}>
						<RadioButton
							change={this.props.change}
							inputType="radio"
							groupName="radioButtonValue"
							buttonValue={el}
							answerText={text.body.innerHTML}
							checkedStatus={this.props.checkedStatus}
						/>
					</div>
				);
			});
		}
		// need to clear timer on submit
		let button = (
			<button
				onClick={() => {
					this.props.submitAnswer();
					clearInterval(this.state.intervalID);
					this.setState({ timer: "--" });
				}}
			>
				Submit
			</button>
		);
		if (this.props.answerStatus !== "") {
			button = <button onClick={this.handleNextQuestion}>Next Question</button>;
		}

		// Decode special characters from string, a little hacky, maybe replace with 'he' library later
		const dom = parser.parseFromString(
			this.props.questionInfo.question,
			"text/html"
		);

		return (
			<div className="question-card">
				<div
					className={[
						"question-card__back",
						"question-card__side",
						this.props.answerStatus,
						this.state.flip ? "flip-back" : ""
					].join(" ")}
				>
					<div onClick={this.handleStartTimer}>Timer: {this.state.timer}</div>
					<h3>Category: {this.props.questionInfo.category}</h3>
					<p>{dom.body.innerHTML}</p>
					<div>
						Choices
						<br />
						{answerChoices}
					</div>
					{button}
				</div>
				<div
					className={[
						"question-card__front",
						"question-card__side",
						this.state.flip ? "flip-front" : ""
					].join(" ")}
					onClick={this.handleCardFlip}
				>
					I'm the front
				</div>
			</div>
		);
	}
}

export default QuestionCard;
// work on ui/ux for cards, add animations to sequence of changing to next question