import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { deleteExperience, getCurrentUserProfile } from "../../actions/profile";

const Experience = ({ profile, deleteExperience }) => {
	// useEffect(() => {
	// 	getCurrentUserProfile();
	// 	console.log("experience useffect fired !");
	// }, []);
	const experiences = profile.experience.map((exp) => {
		return (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td className="hide-sm">{exp.title}</td>
				<td className="hide-sm">
					<Moment>{moment.utc(exp.from)}</Moment> -
					{exp.to === null ? (
						"Now"
					) : (
						<Moment>{moment.utc(exp.to)}</Moment>
					)}
				</td>
				<td>
					<button
						onClick={() => deleteExperience(exp._id)}
						className="btn btn-danger"
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});
	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th></th>
					</tr>
				</thead>

				{profile.experience !== null &&
				profile.experience.length !== 0 ? (
					<tbody>{experiences}</tbody>
				) : (
					<p>No Experience</p>
				)}
			</table>
		</Fragment>
	);
};

Experience.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});
export default connect(mapStateToProps, {
	deleteExperience,
})(Experience);
