import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCategories = () => {
	return dispatch => {
		axios.get("https://opentdb.com/api_category.php").then(resp => {
            // add 'Any' to categories array for dropdown menu
            const categories = resp.data.trivia_categories;
            categories.unshift({"id": categories[categories.length - 1].id + 1, "name": "Any"});
			dispatch({ type: actionTypes.FETCH_CATEGORIES, data: resp.data });
		});
	};
};

export const fetchQuestions = (options) => {
    return dispatch => {
        let queryOptions = '';
        for (let v in options) {
            if(options[v] !== 'any') {
                queryOptions += `&${v}=${options[v]}`
            }
        }
        let queryString = 'https://opentdb.com/api.php?amount=10' + queryOptions; 

        axios.get(queryString).then(resp => {
            dispatch({ type: actionTypes.FETCH_QUESTIONS, data: resp.data });
        });
    };
};
// https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple
// https://opentdb.com/api.php?amount=10 // all set to 'any' except amount(required)