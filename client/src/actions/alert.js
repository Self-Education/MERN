import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./constants";

export default (type, msg) => (dispatch) => {
	const id = uuidv4();
	dispatch({
		type: SET_ALERT,
		payload: { msg, type, id },
	});
};
