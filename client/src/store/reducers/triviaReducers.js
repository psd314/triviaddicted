import * as actionTypes from "../actions/actionTypes";

const initialState = {
    categories: [],
    questions: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEGORIES:
            const catArray = action.data.trivia_categories; // fixed async issue by declaring before concatenating
            return {
                ...state,
                categories: state.categories.concat(catArray)// use concat() to update state immutably
            }
        case actionTypes.FETCH_QUESTIONS:
            return {
                ...state,
                categories: state.questions.concat([])
            }
        default:
            return state;
    }
}

export default reducer;