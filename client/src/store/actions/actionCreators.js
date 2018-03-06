import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCategories = () => {
	return dispatch => {
		axios.get("https://opentdb.com/api_category.php").then(resp => {
			dispatch({ type: actionTypes.FETCH_CATEGORIES, data: resp.data });
		});
	};
};

export const fetchQuestions = (category) => {
    return dispatch => {
        axios.get("").then(resp => {
            // dispatch({ type: actionTypes.FETCH_QUESTIONS, data: resp.data });
        });
    };
};
// https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple&encode=url3986