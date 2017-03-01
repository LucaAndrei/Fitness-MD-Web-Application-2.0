import React from 'react';

import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/User";
var classNames = require('classnames');

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            user
        } = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        console.log(LOG_TAG,"user",user);

        let isTextMuted = user.status == false ? classNames('text-muted') : classNames('');
        let isIconOffline = user.status == false ? classNames('fa', 'fa-circle','text-danger') : classNames('fa', 'fa-circle','text-success');
        let isTextOffline = user.status == false ? 'Offline' : 'Online';

        console.log("isTextMuted",isTextMuted);
        console.log("isIconOffline",isIconOffline);
        console.log("isTextOffline",isTextOffline);


        return (
            <div className="row">
                <div className="col-xs-3">
                    <div className="avatar">
                        <img src="/img/faces/face-3.jpg" alt="Circle Image" className="img-circle img-no-padding img-responsive" />
                    </div>
                </div>
                <div className="col-xs-9 col-md-6 text-center">
                    {user.profile.name}
                    <br />
                    <span className={isTextMuted}><i className={isIconOffline}></i><small>{isTextOffline}</small></span>
                </div>
                <div className="col-xs-7 col-xs-offset-1 col-md-3 col-md-offset-0 text-right">
                    <Link to = {`/app/chat/${this.props.user._id}`} className="btn btn-lg btn-success btn-icon"><i className="fa fa-envelope"></i></Link>
                    <Link to = {`/app/profile/${this.props.user._id}`} className="btn btn-lg btn-success btn-icon"><i className="fa fa-id-card"></i></Link>
                </div>
                <div className = "col-xs-12">
                    <div className="col-xs-4 text-center text-muted">
                        Time active <br /> 12:12:12
                    </div>
                    <div className="col-xs-4 text-center text-muted">
                        Time active <br /> 12:12:12
                    </div>
                    <div className="col-xs-4 text-center text-muted">
                        Time active <br /> 12:12:12
                    </div>
                </div>
            </div>
        )
    }
}