import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import setAlert from "../../actions/alert";

const Register = ({ setAlert }) => {
	const [formData, setState] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const { name, email, password, password2 } = formData;

	const changeHandler = (e) =>
		setState({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		if (password === password2) console.log("passwords match");
		else setAlert("danger", "Passwords do not match");
	};
	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Create Your Account
				</p>
				<form className="form" onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Name"
							name="name"
							value={name}
							onChange={changeHandler}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							value={email}
							onChange={changeHandler}
						/>
						<small className="form-text">
							This site uses Gravatar so if you want a profile
							image, use a Gravatar email
						</small>
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
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirm Password"
							name="password2"
							value={password2}
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
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</section>
		</Fragment>
	);
};

export default connect(null, { setAlert })(Register);
