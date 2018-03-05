import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loggedIn: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGGED_IN:
			return {
				...state,
				loggedIn: true
            }
        default:
            return state;
	}
};

export default reducer;
