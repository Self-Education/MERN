import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default () => {
	const [formData, setState] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

	const changeHandler = (e) =>
		setState({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("we are logging in");
	};
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
						value="Register"
					/>
				</form>
				<p className="my-1">
					Don't have an account? <Link to="/register">Sign Up</Link>
				</p>
			</section>
		</Fragment>
	);
};
