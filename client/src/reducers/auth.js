import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_FAIL,
	LOGOUT,
} from "../actions/constants";

const initialState = {
	token: localStorage.getItem("token"),
	user: null,
	finishLoad: false,
	isAuthenticated: false,
};

const auth = (state = initialState, action) => {
	// console.log("i am insdie auth reducer");
	const { type, payload } = action;
	switch (type) {
		case AUTHENTICATION_SUCCESS:
			return {
				...state,
				user: payload,
				finishLoad: true,
				isAuthenticated: true,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				finishLoad: true,
				isAuthenticated: true,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTHENTICATION_FAIL:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				finishLoad: true,
			};
		default:
			return state;
	}
};

export default auth;
