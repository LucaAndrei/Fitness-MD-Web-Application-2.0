import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';
import Footer from '../components/Footer.jsx';
import Loading from '../components/Loading.jsx';
let DEBUG = true;
let LOG_TAG = "imports/ui/layouts/App";

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

        return (
            <div className="wrapper">
                <Sidebar user={user} logout={this.logout} />
                <div className="main-panel">
                    <Topbar user={user} logout={this.logout} />
                    <div className="content">
                        <div className="container-fluid">
                            <ReactCSSTransitionGroup
                                transitionName="fade"
                                transitionEnterTimeout={200}
                                transitionLeaveTimeout={200}>
                                {loading
                                    ? <Loading key="loading" />
                                    : clonedChildren}
                            </ReactCSSTransitionGroup>
                        </div>
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