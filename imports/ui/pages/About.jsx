import React from 'react';

import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/About";

//import {FaStar, FaCode, FaComment, FaUserPlus, FaEdit, FaBook} from 'react-icons/lib/fa'

export default class About extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
                <div className="container-fluid">
                    <div className="page-header">
                        <h3 id="timeline">Education and Training</h3>
                    </div>
                    <section id="cd-timeline" className="cd-container">
                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img green timeline-badge">
                            </div>
                            <div className="cd-timeline-content">
                                <p>Faculty of Automatic Control and Computers, “Dunarea de Jos” University, Galati</p>
                                <p>
                                    <i>Title of qualification awarded :</i>
                                    <b> Bachelor in Computer Science and Information Technology</b>
                                </p>
                                <p>
                                    <i>Thesis title :</i>
                                    <b> Web application using M.E.A.N (MongoDB, ExpressJS, AngularJS, NodeJS) framework suite</b>
                                </p>
                                <p>
                                    <i>Principal subjects/occupational skills covered :</i>
                                </p>
                                <ul className="timeline-item-list">
                                    <li>Mathematics</li>
                                    <li>Informatics</li>
                                    <li>Object-Oriented Programming</li>
                                    <li>Database Design and Programming</li>
                                </ul>
                                <span className="cd-date">2011 - 2015</span>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img red">
                            </div>

                            <div className="cd-timeline-content">
                                <p>Faculty of Automatic Control and Computers, “Dunarea de Jos” University, Galati</p>
                                <p>
                                    <i>Title of qualification awarded :</i>
                                    <b> Master in Advanced Information Technology</b>
                                </p>
                                <p>
                                    <i>Thesis title :</i>
                                    <b> Android application for an Arduino Pedometer</b>
                                </p>
                                <p>
                                    <i>Principal subjects/occupational skills covered :</i>
                                </p>
                                <ul className="timeline-item-list">
                                    <li>Database Administration</li>
                                    <li>Advanced Object-Oriented Programming</li>
                                    <li>Multimedia & Web applications</li>
                                </ul>
                                <span className="cd-date">2015 - Present</span>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img yellow">
                            </div>

                            <div className="cd-timeline-content">
                                <p>
                                    <i>Occupation or position held :</i>
                                    <b> ActionScript 3.0 Developer</b>
                                </p>
                                <p>
                                    <i>Main activities and responsibilities : </i>
                                    <b> Developing e-Learning software</b>
                                </p>
                                <p>
                                    <i>Name of the employer :</i>
                                    <b>SC AltFactor SRL</b>
                                </p>
                                <span className="cd-date">2013 - 2014</span>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img green">
                            </div>

                            <div className="cd-timeline-content">
                                <p>
                                    <i>Occupation or position held :</i>
                                    <b> Android Developer</b>
                                </p>
                                <p>
                                    <i>Main activities and responsibilities : </i>
                                    <b> MOST (Media Oriented Systems Transport) implementation on the Android platform</b>
                                </p>
                                <p>
                                    <i>Name of the employer :</i>
                                    <b> Wind River, Galati, Romania</b>
                                </p><span className="cd-date">2014 - Present</span>
                            </div>
                        </div>

                         <div className="cd-timeline-block">
                            <div className="cd-timeline-img red">
                            </div>

                            <div className="cd-timeline-content">
                                <p>Award of course completion – Oracle Academy, Database Design and Programming with SQL & PL/SQL</p>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img yellow">
                            </div>

                            <div className="cd-timeline-content">
                                <p>Digital Competence Certificate</p>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img green">
                            </div>

                            <div className="cd-timeline-content">
                                <p>Certificate of Professional Competence</p>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img red">
                            </div>

                            <div className="cd-timeline-content">
                                <p>
                                    Other foreign language(s):
                                </p>
                                <p>
                                    English (writing, understanding, speaking) – Linguistic Competence Certificate, B2
                                </p>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img yellow">
                            </div>

                            <div className="cd-timeline-content">
                                <p>
                                    Computer skills and competences
                                </p>
                                <ul className="timeline-item-list">
                                    <li>C++</li>
                                    <li>Java</li>
                                    <li>Android</li>

                                    <br />
                                    <li>Javascript</li>
                                    <li>HTML</li>
                                    <li>CSS</li>
                                    <li>jQuery</li>
                                    <li>ActionScript 3.0</li>
                                    <li>NodeJS</li>

                                    <br />
                                    <li>Windows</li>
                                    <li>Linux</li>
                                </ul>
                            </div>
                        </div>

                        <div className="cd-timeline-block">
                            <div className="cd-timeline-img green">
                            </div>

                            <div className="cd-timeline-content">
                            <p>Other skills and competences</p>
                                <ul className="timeline-item-list">
                                    <li>I have good communication and social skills and can integrate easily in working environments</li>
                                    <li>I have effective leadership and organizational aptitudes</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
        )
    }
}