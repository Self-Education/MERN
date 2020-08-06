import { SET_ALERT, REMOVE_ALERT } from "../actions/constants";

const initialState = [];

export default (state = initialState, action) => {
	console.log("i am inside reducer/alert");

	const { type, payload } = action;
	// console.log(payload);
	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case REMOVE_ALERT:
			return state.filter((s) => s.id !== payload);
		default:
			return state;
	}
};
