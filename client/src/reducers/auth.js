import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/constants";

const initialState = {
	token: localStorage.getItem("token"),
	user: null,
	finishLoad: false,
	isAuthenticated: false,
};

const auth = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				finishLoad: true,
				isAuthenticated: true,
			};
		case REGISTER_FAIL:
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
