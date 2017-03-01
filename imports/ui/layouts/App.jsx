import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';
import Footer from '../components/Footer.jsx';
import Loading from '../components/Loading.jsx';
let DEBUG = true;
let LOG_TAG = "imports/ui/layouts/App";

var classNames = require('classnames');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
        this.logout = this.logout.bind(this);
    }

    toggleMenu(menuOpen = !Session.get('menuOpen')) {
        Session.set({ menuOpen });
    }

    logout() {
        if (DEBUG) {
            console.log(LOG_TAG, "logout");
        }
        Meteor.logout();
        this.context.router.push("/");
    }

    render() {
        if (DEBUG) {
            console.log(LOG_TAG, "render this.props : ",this.props);
        }

        const {
            user,
            loading,
            children,
            menuOpen,
            location,
        } = this.props;

        const closeMenu = this.toggleMenu.bind(this, false);

        // clone route components with keys so that they can have transitions
        const clonedChildren = children && React.cloneElement(children, {
            key: location.pathname
        });

        console.log("location",location,location.pathname);
        let containerClasses;
        if (location.pathname == "/signin" || location.pathname == "/join" || location.pathname == "/contact") {
            containerClasses = classNames('logged-out-container');
        }

        return (
            <div className="wrapper">

                <div className="main-panel-extended">
                    <Topbar user={user} logout={this.logout} />
                    <div className={containerClasses}>
                        {
                            loading
                                ? <Loading key="loading" />
                                : clonedChildren
                        }
                        </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object,
};