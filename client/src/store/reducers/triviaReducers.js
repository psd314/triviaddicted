import * as actionTypes from "../actions/actionTypes";

const initialState = {
	categories: [],
    questions: [],
    initialCategoryId: "" 
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CATEGORIES:
            const catArray = action.data.trivia_categories; // fixed async issue by declaring before concatenating

            return {
				...state,
                categories: state.categories.concat(catArray), // use concat() to update state immutably
                categoryId: (!state.initialCategoryId) ? catArray[0].id + "" : state.initialCategoryId + ""
			};
		case actionTypes.FETCH_QUESTIONS:
			return {
				...state,
				questions: state.questions.concat([])
			};
		default:
			return state;
	}
};

export default reducer;
