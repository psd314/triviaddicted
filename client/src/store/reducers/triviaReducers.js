import * as actionTypes from "../actions/actionTypes";

const initialState = {
	categories: [],
	questions: [],
	categoryId: "",
	questionIndex: -1
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CATEGORIES:
			const catArray = action.data; // fixed async issue by declaring before concatenating
			return {
				...state,
				categories: catArray,
				categoryId: !state.categoryId
					? catArray[0].id.toString()
					: state.categoryId.toString()
			};
		case actionTypes.FETCH_QUESTIONS:
			// shuffle answers here to prevent rerendering
			for (let i in action.data.results) {
				let choices = [];
				choices = choices.concat(action.data.results[i].correct_answer);
				choices = choices.concat(action.data.results[i].incorrect_answers);

				for(let j = 0; j < choices.length; j++) {
					let rand = Math.floor(Math.random() * choices.length);
					let swap = choices[j]
					choices[j] = choices[rand];
					choices[rand] = swap;
				}
				action.data.results[i].choices = choices;
			}
			return {
				...state,
				questions: action.data.results,
				questionIndex: action.data.results.length - 1
			};
		case actionTypes.UPDATE_CATEGORY:
			return {
				...state,
				categoryId: action.event
			};
		case actionTypes.UPDATE_QUESTION_INDEX:
			return {
				...state,
				questionIndex: state.questionIndex - 1
			};
		default:
			return state;
	}
};

export default reducer;
