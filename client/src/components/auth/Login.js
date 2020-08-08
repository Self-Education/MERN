import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setState] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

	const changeHandler = (e) =>
		setState({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	// redirect if the user is authenticated
	// use Redirect here, Redirect will navigate to a new location, the new location wll
	// override the current location in the history stack, the user cannot GO BACK to the
	// previous page by press Back button

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Sign in</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Sign into Your Account
				</p>
				<form className="form" onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							value={email}
							onChange={changeHandler}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password}
							onChange={changeHandler}
							minLength="6"
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary"
						value="Login"
					/>
				</form>
				<p className="my-1">
					Don't have an account? <Link to="/register">Sign Up</Link>
				</p>
			</section>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
