import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Content = ({ title, description, genre }) => (
	<div className="content-content">
		<div className="content-header">
			<div className="content-title">
				{title}
			</div>
			<div className="content-description">
				{description}
			</div>
			<div className="content-genre">
				{genre}
			</div>
		</div>
	</div>
);

Content.propTypes = {
	description: PropTypes.string.isRequired,
	genre: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

export default Content;