import React from "react";
import { Link } from "react-router-dom";
import {connect} from "reac-redux";


export const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> DevConnector
				</Link>
			</h1>
			<ul>
				<li>
					<Link to="!#">Developer</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	userName: state.user.
})
