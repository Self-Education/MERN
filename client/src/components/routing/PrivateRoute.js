import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// component: comes from "component={componentName}", indicates the component that to be rendered
// props: props that the component accepts
// ...rest: rest of props that PrivateRoute accepts, such as path ...
const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, finishLoad },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated && finishLoad ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
