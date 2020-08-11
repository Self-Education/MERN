import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";
import Experience from "./Experience";

const Dashboard = ({
	auth: { user },
	getCurrentUserProfile,
	profile: { profile, finishLoad },
}) => {
	useEffect(() => {
		console.log("dashbard useeffect fired!");
		getCurrentUserProfile();
	}, [getCurrentUserProfile]);

	return !finishLoad && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardMenu />
					<Experience experience={profile.experience} />
				</Fragment>
			) : (
				<Fragment>
					<p>No profile, please create a profile</p>
					<Link
						exact="true"
						to="/create-profile"
						className="btn btn-primary my-1"
					>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	getCurrentUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
