import axios from "axios";
import {
	GET_PROFILE_SUCCESS,
	PROFILE_ERROR,
	CREATE_PROFILE_ERROR,
	NEW_PROFILE_CREATED,
} from "./constants";

import setAlert from "./alert";

const getCurrentUserProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");
		dispatch({
			type: GET_PROFILE_SUCCESS,
			payload: res.data, // user's profile
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// update or create Profile
const createProfile = (formdata) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = formdata;
	try {
		console.log("i am going to create a new profile");
		const res = await axios.post("/api/profile", body, config);
		dispatch({
			type: NEW_PROFILE_CREATED,
		});
		dispatch(getCurrentUserProfile());
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors)
			errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
		dispatch({
			type: CREATE_PROFILE_ERROR,
		});
	}
};

export { getCurrentUserProfile, createProfile };
