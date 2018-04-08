import * as actionTypes from "./actionTypes";
import axios from "axios";
import setJwtToken from "../../utils/setJwtToken";
import jwt from "jsonwebtoken";

export const fetchCategories = () => {
	return dispatch => {
		axios
			.post("/categories", { url: "https://opentdb.com/api_category.php" })
			.then(resp => {
				dispatch({ type: actionTypes.FETCH_CATEGORIES, data: resp.data });
			});
	};
};

export const fetchQuestions = options => {
	return dispatch => {
		let queryOptions = "";
		for (let v in options) {
			if (options[v] !== "any") {
				queryOptions += `&${v}=${options[v]}`;
			}
		}
		let queryString = "https://opentdb.com/api.php?amount=10" + queryOptions;
		// run query on server due to trivia api rejecting due to Authentication header
		axios.post("/questions", { url: queryString }).then(resp => {
			dispatch({ type: actionTypes.FETCH_QUESTIONS, data: resp.data });
		});
	};
};
// https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple
// https://opentdb.com/api.php?amount=10 // all set to 'any' except amount(required)

export function setCurrentUser(user) {
	return {
		type: actionTypes.SET_CURRENT_USER,
		user
	};
}

export function login(data) {
	return dispatch => {
		return axios.post("/login/local", data).then(res => {
			const token = res.data.token;
			localStorage.setItem("jwtToken", token);
			setJwtToken(token);
			dispatch(setCurrentUser(jwt.decode(token)));
		});
	};
}

export function logout() {
	console.log("loggin ot");
	return dispatch => {
		localStorage.removeItem("jwtToken");
		setJwtToken(false);
		dispatch(setCurrentUser({}));
	};
}
