import React from 'react';

// a common layout wrapper for auth pages
const AuthPage = ({content,link}) => (
		<div className="container-fluid">
		    <div className = "col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3 auth-page">
		           {content}
		    </div>
		</div>
);

AuthPage.propTypes = {
    content: React.PropTypes.element,
};

export default AuthPage;