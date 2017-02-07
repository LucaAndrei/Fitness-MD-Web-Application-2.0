import React from 'react';
import {
    Link
} from 'react-router';

import NavLink from './NavLink.jsx'

let DEBUG = true;
let LOG_TAG = "imports/ui/components/Footer";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <footer className="footer">
            <div className="container-fluid">
                <nav className="pull-left">
                    <ul>
                        <NavLink to="/about" className="menu-item">
                            <i className="icon-menu fa fa-fw fa-info" /><p>About</p>
                        </NavLink>

                        <NavLink to="/contact" className="menu-item">
                            <i className="icon-menu fa fa-fw fa-envelope" /><p>Contact</p>
                        </NavLink>
                    </ul>
                </nav>
                <div className="copyright pull-right">
                    &copy; <script>document.write(new Date().getFullYear())</script>, made with <i className="fa fa-heart heart"></i> by <a href="http://www.creative-tim.com">Creative Tim</a>
                </div>
            </div>
        </footer>
        );
    }
}