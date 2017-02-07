import React from 'react';
import {
    Link
} from 'react-router';


let DEBUG = true;
let LOG_TAG = "imports/ui/components/NavLink";

export default class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = "";
        if(this.props.to) {
            let isActive = this.context.router.isActive(this.props.to, true);
            className = isActive ? "active" : "";
        }

            //console.log("this.context.router",this.context.router.isActive('/app/users'))
        return (
            <li className = {className}>
                <Link {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object,
};