import axios from "axios";
import {
	GET_PROFILE_SUCCESS,
	PROFILE_ERROR,
	CREATE_PROFILE_ERROR,
	NEW_PROFILE_CREATED,
	PROFILE_UPDATED,
	EXPERIENCE_ERROR,
	EXPERIENCE_SUCCESS,
	EDUCATION_ERROR,
	EDUCATION_SUCCESS,
	EXPERIENCE_DELETED,
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
const createProfile = (formdata, edit = false, history) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = formdata;
	try {
		console.log("i am going to create/update a new profile");
		await axios.post("/api/profile", body, config);
		const type = edit ? PROFILE_UPDATED : NEW_PROFILE_CREATED;
		dispatch({
			type: type,
		});
		dispatch(getCurrentUserProfile()); // update store with lastest profile
		dispatch(
			setAlert("success", edit ? "Profile Updated" : "Profile Created")
		);
		// redirect to dashboard if finish creating new profile
		if (!edit) {
			history.push("/dashboard");
		}
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors)
			errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
		dispatch({
			type: CREATE_PROFILE_ERROR,
		});
	}
};

// add Experience
const addExperience = (experienceData, history) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		await axios.put("/api/profile/experience", experienceData, config);
		dispatch({
			type: EXPERIENCE_SUCCESS,
		});
		console.log("i am here");
		// dispatch(getCurrentUserProfile());
		dispatch(setAlert("success", "New Experience Added"));
		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
		}
		dispatch({
			type: EXPERIENCE_ERROR,
		});
	}
};

// add Education
const addEducation = (educationData, history) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		await axios.put("/api/profile/education", educationData, config);
		dispatch({
			type: EDUCATION_SUCCESS,
		});
		// dispatch(getCurrentUserProfile());
		dispatch(setAlert("success", "New Education Added"));
		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
		}
		dispatch({
			type: EDUCATION_ERROR,
		});
	}
};

// deleteExp by ID

const deleteExperience = (expId) => async (dispatch) => {
	try {
		const res = axios.delete(`/api/profile/experience/${expId}`);
		dispatch({
			type: EXPERIENCE_DELETED,
		});
		dispatch(getCurrentUserProfile());
		dispatch(setAlert("success", "Education Removed"));
	} catch (error) {
		dispatch({
			type: EXPERIENCE_ERROR,
		});
	}
};

export {
	getCurrentUserProfile,
	createProfile,
	addExperience,
	addEducation,
	deleteExperience,
};
