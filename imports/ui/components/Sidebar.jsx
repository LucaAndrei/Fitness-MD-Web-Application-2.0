import React from 'react';

import NavLink from './NavLink.jsx'

let DEBUG = true;
let LOG_TAG = "imports/ui/components/Sidebar";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            user
        } = this.props;

        console.log(LOG_TAG,"this.props",this.props);


        const isUserAdmin = this.props.user && Roles.userIsInRole(Meteor.userId(), 'admin');
        return (

            <div className="sidebar" data-background-color="white" data-active-color="danger">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <NavLink to="/" className="simple-text">
                            <i className="fa fa-fw fa-heartbeat fa-2x" />Fitness MD
                        </NavLink>
                    </div>

                    {
                        this.props.user
                            ?
                                <div className="user-panel">
                                    <div className="pull-left image">
                                        <img src="/img/faces/face-3.jpg" className="img-circle" alt="User Image" />
                                    </div>
                                    <div className="pull-left info">
                                        <p>{this.props.user.profile.name}</p>
                                        <i className="fa fa-circle text-success"></i> Online
                                    </div>
                                </div>
                            :   ""
                    }
                    <ul className="nav">

                        {
                            isUserAdmin
                                ?
                                    <NavLink to="/app/dashboard" className="menu-item">
                                        <i className="ti-panel"></i>
                                        <p>Dashboard</p>
                                    </NavLink>
                                :   ""
                        }

                        {
                            isUserAdmin
                                ?
                                    <NavLink to="/app/users" className="menu-item">
                                        <i className="icon-menu fa fa-fw fa-users" /><p>Users</p>
                                    </NavLink>
                                :   ""
                        }

                        {
                            this.props.user
                                ?
                                    <NavLink to="/app/challenges" className="menu-item">
                                        <i className="icon-menu fa fa-fw fa-check-square-o" /><p>Challenges</p>
                                    </NavLink>
                                :   ""
                        }

                        {
                            isUserAdmin
                                ?
                                    <NavLink to="/app/competitions" className="menu-item">
                                        <i className="icon-menu fa fa-fw fa-flag-checkered" /><p>Competitions</p>
                                    </NavLink>
                                :   ""
                        }

                        {
                            this.props.user
                                ?
                                    ""
                                :
                                    <NavLink to="/signin" className="menu-item">
                                        <i className="icon-menu fa fa-fw fa-sign-in" /><p>Login</p>
                                    </NavLink>
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    user: React.PropTypes.object
};