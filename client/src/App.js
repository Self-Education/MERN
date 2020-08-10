import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import { authenticateUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import CreateProfile from "./components/profile-forms/CreateProfile";

// call setAuthToken outside to make sure token is stored before App is rendered
// think about the case that we dont call setAtuthToken() here,
// and the nested compoenent A has another effect E, the
// child effect is called before parent's effect, in this casem if A need to
// authenticate user, but there is no token in the global header
setAuthToken();

function App() {
	// authenticate user every time App component mounts, please note
	// that the empty array as the second arg makes this equivalent to
	// componentDidMount(), it wont be revoked when App rerender

	// can not call authenticateUser() directly, since component is not
	// able to connect to Redux, it has to be dispatched
	useEffect(() => {
		store.dispatch(authenticateUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/" component={Landing} />

					<section className="container">
						<Switch>
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route exact path="/login" component={Login} />
							<PrivateRoute
								exaxt
								path="/dashboard"
								component={Dashboard}
							/>
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
