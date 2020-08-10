import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) => {
	console.log("i am insdie the alert components");
	if (alerts !== null && alerts.length > 0) {
		return alerts.map((alert) => {
			return (
				<div key={alert.id} className={`alert alert-${alert.type}`}>
					{alert.msg}
				</div>
			);
		});

		// );
	} else {
		return <></>;
	}
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
