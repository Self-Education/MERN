import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./constants";

export default (type, msg) => (dispatch) => {
	// console.log("i am inside action/alert");
	const id = uuidv4();
	dispatch({
		type: SET_ALERT,
		payload: { msg, type, id },
	});

	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
