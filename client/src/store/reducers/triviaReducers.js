import * as actionTypes from "../actions/actionTypes";

const initialState = {
	categories: [],
    questions: [],
    categoryId: "" 
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CATEGORIES:
            const catArray = action.data.trivia_categories; // fixed async issue by declaring before concatenating
            return {
				...state,
                categories: state.categories.concat(catArray), // use concat() to update state immutably
                categoryId: (!state.categoryId) ? catArray[0].id.toString() : state.categoryId.toString()
			};
		case actionTypes.FETCH_QUESTIONS:
			console.log('action.data', action.data.results);
			return {
				...state,
				questions: state.questions.concat(action.data.results)
			};
		case actionTypes.UPDATE_CATEGORY:
			return {
				...state,
				categoryId: action.event
			}
		default:
			return state;
	}
};

export default reducer;
