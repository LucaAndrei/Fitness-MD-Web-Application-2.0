import React from 'react';

import NavLink from '../components/NavLink.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/Index";

var _ = require('lodash');

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, { shouldDisplayAuthLinks: false});
        this.displayAuthLinks = this.displayAuthLinks.bind(this);
        this.onClickDownload = this.onClickDownload.bind(this);
    }

    onClickDownload() {
        console.log("onClickDownload");
        Meteor.call("insertDownload", {

        }, ( error, response ) => {

            if ( error ) {
                console.log(LOG_TAG,"error",error);
                Bert.alert( error.reason, "warning" , 'growl-top-right' );
            } else if (response) {
                console.log(LOG_TAG,"response",response);
                Bert.alert( "Success download", 'success', 'growl-top-right' );
            }
        });
    }

    componentWillMount() {
        console.log(LOG_TAG,"componentWillMount",Meteor.user())
        this.displayAuthLinks();
        if (Meteor.user() != null && Meteor.user() != undefined) {
            this.context.router.push("/app/dashboard");
        }
    }
    displayAuthLinks() {
        console.log("displayAuthLinks")
        if ($(window).width() <= 991) {
            this.setState({shouldDisplayAuthLinks : true});
        } else {
            this.setState({shouldDisplayAuthLinks : false});
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.displayAuthLinks);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.displayAuthLinks);
    }

    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
            <div>
                <section className="hero">
                    <div className="container">
                        <div className = "col-md-6 col-md-offset-4">
                            <hgroup>
                                <h1 className="fb_welcome_message">
                                    Find your fit, <br />
                                    join free today
                                </h1>
                            </hgroup>
                            <p>
                                Your workout, your device, anywhere, anytime.<br />
                                Take challenges, competitions, analyze your results !
                            </p>
                            {
                                this.state.shouldDisplayAuthLinks
                                    ?
                                        <div className="index-auth">
                                            <NavLink to="/signin" className="btn btn-info btn-fill btn-wd">
                                                Login
                                            </NavLink>

                                            or

                                            <NavLink to="/join" className="btn btn-info btn-fill btn-wd">
                                                Signup
                                            </NavLink>
                                        </div>
                                    :   ""
                            }
                        </div>
                        <div className = "col-md-2">
                            <div className = "phone">
                                <img className = "" src="img/iphone.png" />
                            </div>
                            <div className = "downloadApp">
                                <a href="img/iphone.png" download>
                                    <img className = "img-responsive" src="img/playstore.png" onClick={this.onClickDownload}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="features">
                    <div className="container">
                        <div className = "col-md-4 text-center feature">
                            <i className="fa fa-5x fa-flag-checkered"></i>
                            <h5 className = "text-uppercase">Challenges</h5>
                            <p>
                                Keep yourself motivated ! Take challenges created by our fitness doctors to meet your needs !
                            </p>
                        </div>
                        <div className = "col-md-4 text-center feature">
                            <i className="fa fa-5x fa-line-chart"></i>
                            <h5 className = "text-uppercase">Track Your Activity</h5>
                            <p>
                                Record activity in real-time with our mobile app. Visualize and analyze charts and never miss a beat.
                            </p>
                        </div>
                        <div className = "col-md-4 text-center feature">
                            <i className="fa fa-5x fa-map-marker"></i>
                            <h5 className = "text-uppercase">Competitions</h5>
                            <p>
                                Register to competitions in your city. View the route on the map and participate with your friends.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

Index.contextTypes = {
    router: React.PropTypes.object,
};