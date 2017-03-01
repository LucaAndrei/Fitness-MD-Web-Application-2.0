import React from 'react';
import {
    Link
} from 'react-router';

import TopbarLoggedOut from './TopbarLoggedOut.jsx'


let DEBUG = true;
let LOG_TAG = "imports/ui/components/Topbar";

export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(LOG_TAG,"this.props",this.props);
        return (

            <nav className="navbar navbar-default">
                {
                    this.props.user
                        ?
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar bar1"></span>
                                    <span className="icon-bar bar2"></span>
                                    <span className="icon-bar bar3"></span>
                                </button>
                                <a className="navbar-brand" href="#">Dashboard</a>
                            </div>
                        :   ""
                }
                {
                    this.props.user
                        ?
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="fa fa-fw fa-envelope"></i>
                                            <span className="label label-success">4</span>
                                        </a>
                                    </li>
                                    <li className="dropdown user-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <img src="/img/faces/face-3.jpg" className="img-circle pull-left user-image" alt="User Image" />
                                            <span className="hidden-xs">{this.props.user.profile.name}</span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="user-header">
                                                <img src="/img/faces/face-3.jpg" className="img-circle" alt="User Image" />
                                                <p>
                                                  {this.props.user.profile.name} - Web Developer
                                                  <small>Member since Nov. 2012</small>
                                                </p>
                                            </li>
                                            <li className="user-footer">
                                                <div className="pull-left">
                                                    <Link to = {`/app/editProfile/${this.props.user._id}`} className="btn btn-fill btn-md">Profile</Link>
                                                </div>
                                                <div className="pull-right">
                                                    <Link onClick={this.props.logout} className="btn btn-fill btn-md">Sign out</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        :
                            <TopbarLoggedOut />
                }
            </nav>
        );
    }
}

Topbar.propTypes = {
    logout: React.PropTypes.func
};