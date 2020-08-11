import {
	GET_PROFILE_SUCCESS,
	PROFILE_ERROR,
	CLEAR_PROFILE,
} from "../actions/constants";

const initialState = {
	profile: null,
	profiles: [],
	finishLoad: false,
	repos: [],
	error: {},
};
const profile = (state = initialState, action) => {
	// console.log("i am inside the profile reducer");
	const { type, payload } = action;
	console.log("type is " + type);
	console.log(payload);
	switch (type) {
		case GET_PROFILE_SUCCESS:
			return {
				...state,
				profile: payload,
				finishLoad: true,
				error: {},
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				finishLoad: true,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				profiles: [],
				finishLoad: true,
				repos: [],
			};
		default:
			return state;
	}
};

export default profile;
