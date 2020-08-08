import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_FAIL,
} from "./constants";
import setAlert from "./alert";
import setAuthToken from "../utils/setAuthToken";

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
		console.info("i am going to post ");
		console.info(res);
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

const login = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = { email, password };
	try {
		// post loggin data to login route
		console.info("i am going to post to login route");
		const res = await axios.post("/api/auth", body, config);
		console.info(res);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		console.error("------actions/auth/login: ---------");
		console.error(error);
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// authenticate user
// login and register just get the token of the user, need to get the instance of user
const authenticateUser = () => async (dispatch) => {
	setAuthToken();
	try {
		console.info("i am inside authenticateUser");
		const res = await axios.get("/api/auth");
		console.info("response from auth is :" + res);
		dispatch({
			type: AUTHENTICATION_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: AUTHENTICATION_FAIL,
		});
	}
};

const logout = (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
export { register, login, authenticateUser };
