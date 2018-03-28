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
            const catArray = action.data.trivia_categories; // fixed async issue by declaring before concatenating
            return {
				...state,
                categories: catArray,
                categoryId: (!state.categoryId) ? catArray[0].id.toString() : state.categoryId.toString()
			};
		case actionTypes.FETCH_QUESTIONS:
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
