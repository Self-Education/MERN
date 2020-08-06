import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./constants";
import setAlert from "./alert";

const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = JSON.stringify({ name, email, password });
	console.log(body);
	try {
		const res = await axios.post("/api/users", body, config);
		console.log("i am going to post ");
		console.log("response after post register");
		console.log(res);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		const err = error.response.data.errors;
		// console.log(err);
		if (err) {
			// console.log("i am here");
			err.forEach((e) => dispatch(setAlert("danger", e.msg)));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

export { register };
