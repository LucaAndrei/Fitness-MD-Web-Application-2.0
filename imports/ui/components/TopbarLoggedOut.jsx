import React from 'react';
import {
    Link
} from 'react-router';

import NavLink from './NavLink.jsx'

let DEBUG = true;
let LOG_TAG = "imports/ui/components/TopbarLoggedOut";

export default class TopbarLoggedOut extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(LOG_TAG,"this.props",this.props);
        return (
            <div className="container">
                <div className="navbar-header">

                    <div className="logo">
                        <Link to="/" className="simple-text">
                            <i className="fa fa-fw fa-heartbeat fa-2x" />Fitness MD
                        </Link>
                    </div>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav nav-pills pull-right topbar-logged-out">
                        <NavLink to="/signin" className="menu-item logged-out-menu-item" role="presentation">
                            Login
                        </NavLink>
                        <NavLink to="/join" className="menu-item logged-out-menu-item" role="presentation">
                            Signup
                        </NavLink>
                    </ul>
                </div>
            </div>
        );
    }
}

TopbarLoggedOut.propTypes = {
    logout: React.PropTypes.func
};