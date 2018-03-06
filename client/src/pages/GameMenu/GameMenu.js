import React, { Component } from "react";
import "./GameMenu.css";
import { connect } from "react-redux";
// import * as actionTypes from "../../store/actions/actionTypes";
import * as actionCreators from "../../store/actions/actionCreators";

class GameMenu extends Component {
	state = {
		categoryId: "" // need to make programatically
	};

	componentDidMount() {
		// console.log('state:', this.state.categoryId, ', props:', this.props.categoryId);
		this.props.onFetchCategories();
	}

	componentDidUpdate() {
        // not sure about this pattern, redux complicating things here, probably better served managing 
        // categoryId and category calls in component state
        if (this.state.categoryId === "") {
            this.setState({categoryId: this.props.categoryId});
        }
        console.log('props:', this.props, ', state:', this.state);
	}

	handleChange = event => {
		const categoryNumber = event.target.value;
		this.setState({ categoryId: categoryNumber });
	};

	render() {
		let display = "Loading...";
		if (this.props.categories) {
			display = this.props.categories.map(el => {
				return (
					<option data={el.id} value={el.id} key={el.id}>
						{el.name}
					</option>
				);
			});
		}

		return (
			<div>
				<h2>Play - Game entry point</h2>
				<select value={this.state.value} onChange={this.handleChange}>
					{display}
				</select>
				<br />
				<button onClick={event => console.log(event)}>Use Your Noodle!</button>
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
		onFetchQuestions: category =>
			dispatch(actionCreators.fetchQuestions(category))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
