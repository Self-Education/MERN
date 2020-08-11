import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

const EducationForm = ({ addEducation, history }) => {
	const initialState = {
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	};
	const [educationData, setState] = useState(initialState);
	const [displayTo, toggleDispay] = useState(true);

	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = educationData;
	const changeHandler = (event) => {
		setState({
			...educationData,
			[event.target.name]: event.target.value,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		addEducation(educationData, history);
	};

	return (
		<Fragment>
			<Alert />
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<i className="fas fa-graduation-cap"></i> Add any school,
				bootcamp, etc that you have attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						name="school"
						value={school}
						onChange={changeHandler}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						value={degree}
						onChange={changeHandler}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field Of Study"
						name="fieldofstudy"
						value={fieldofstudy}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							value={current}
							onChange={() => {
								setState({
									...educationData,
									current: !current,
								});
								toggleDispay(!displayTo);
							}}
						/>{" "}
						Current School or Bootcamp
					</p>
				</div>
				{displayTo && (
					<div className="form-group">
						<h4>To Date</h4>
						<input
							type="date"
							name="to"
							value={to}
							onChange={changeHandler}
						/>
					</div>
				)}

				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						value={description}
						onChange={changeHandler}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

EducationForm.propTypes = {
	addEducation: PropTypes.func.isRequired,
};
export default connect(null, { addEducation })(EducationForm);
