import axios from "axios";
//set the local token to the axios global headers, no need to define later

const setAuthToken = () => {
	// console.info("-------- I am inisde setAuthToken ----------");
	const token = localStorage.getItem("token");
	if (token) axios.defaults.headers.common["x-auth-token"] = token;
	else delete axios.defaults.headers.common["x-auth-token"];
};

export default setAuthToken;
