import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';
import Footer from '../components/Footer.jsx';
import Loading from '../components/Loading.jsx';
let DEBUG = true;
let LOG_TAG = "imports/ui/layouts/AuthenticatedApp";

export default class AuthenticatedApp extends React.Component {
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


    componentDidUpdate(prevProps, prevState) {
        // console.log(LOG_TAG,"prevProps",prevProps);
        // console.log(LOG_TAG,"prevState",prevState);
        // console.log(LOG_TAG,"props after update",this.props);
        if (this.props.user == null || this.props.user == undefined) {
            this.context.router.push("/signin");
        }
    }

    logout() {
        if (DEBUG) {
            console.log(LOG_TAG, "logout");
        }
        Meteor.logout();
        this.context.router.push("/");
    }

    render() {
        const {
            user,
            loading,
            children,
            menuOpen,
            location,
            allUsers,
            messages,
            challenges,
            competitions,
            downloads
        } = this.props;

        const closeMenu = this.toggleMenu.bind(this, false);

        if (DEBUG) {
            console.log(LOG_TAG, "render this.props : ",this.props);
        }

        // clone route components with keys so that they can have transitions
        const clonedChildren = children && React.cloneElement(children, {
            key: location.pathname,
            users: allUsers,
            challenges : challenges,
            competitions : competitions,
            downloads
        });
        console.log(LOG_TAG,"clonedChildren",clonedChildren);


        return (
            <div className="wrapper">
                <Sidebar user={user} />
                <div className="main-panel">
                    <Topbar user={user} logout={this.logout} />
                    <div className="content">
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

AuthenticatedApp.propTypes = {
    loading: React.PropTypes.bool,     // subscription status
    menuOpen: React.PropTypes.bool
};

AuthenticatedApp.contextTypes = {
    router: React.PropTypes.object,
};