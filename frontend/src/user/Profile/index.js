import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { getAvatarColor } from '../../util/Colors';

import './index.css';

class Profile extends Component {
	render () {
		const { currentUser } = this.props;

		return (
			<div className="profile">
				{
					currentUser.name ? (
						<div className="user-profile">
							<div className="user-details">
								<div className="user-avatar">
									<Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(currentUser.name) }}>
										{currentUser.name[0].toUpperCase()}
									</Avatar>
								</div>
								<div className="user-summary">
									<div className="full-name">{currentUser.name}</div>
									<div className="username">{currentUser.username}</div>
								</div>
							</div>
						</div>
					) : null
				}
			</div>
		);
	}
}

Profile.propTypes = {
	currentUser: PropTypes.shape({
		name: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired
	}).isRequired,
	match: PropTypes.shape({
		params: PropTypes.object.isRequired
	}).isRequired
};

export default Profile;