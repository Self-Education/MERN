import { SET_ALERT, REMOVE_ALERT } from "./constants";

const initialState = [];

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_ALERT:
			return { ...initialState, payload };
		default:
			return state;
	}
};
