import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCategories = () => {
	return dispatch => {
		axios.get("https://opentdb.com/api_category.php").then(resp => {
			dispatch({ type: actionTypes.FETCH_CATEGORIES, data: resp.data });
		});
	};
};