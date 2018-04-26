import * as actionTypes from "../actions/actionTypes";
import isEmpty from 'lodash/isEmpty';

const initialState = {
	isAuthenticated: false,
	isGuest: false,
	user: {}
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_USER:
			return {
				isAuthenticated: !isEmpty(action.user),
				user: action.user
            }
        default:
            return state;
	}
};

export default reducer;
