import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import About from '../../ui/pages/About.jsx';
import Contact from '../../ui/pages/Contact.jsx';

import Index from '../../ui/pages/Index.jsx';


import AuthenticatedAppContainer from '../../ui/containers/AuthenticatedAppContainer.jsx';
import ChatContainer from '../../ui/containers/ChatContainer.jsx';
import Dashboard from '../../ui/pages/Dashboard.jsx';
import EditProfile from '../../ui/pages/EditProfile.jsx';
import UserProfile from '../../ui/pages/UserProfile.jsx';
import Users from '../../ui/pages/Users.jsx';
import Challenges from '../../ui/pages/Challenges.jsx';
import CompetitionList from '../../ui/pages/CompetitionList.jsx';
import CompetitionForm from '../../ui/pages/CompetitionForm.jsx';

import CompetitionContainer from '../../ui/containers/CompetitionContainer.jsx';

const closeMenuIfOpen = function() {
    if(Session.get('menuOpen')) {
        Session.set({ menuOpen : false });
    }
}


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={Index} onEnter={closeMenuIfOpen}/>
            <Route path="signin" component={AuthPageSignIn} onEnter={closeMenuIfOpen}/>
            <Route path="join" component={AuthPageJoin} onEnter={closeMenuIfOpen}/>
            <Route path="about" component={About} onEnter={closeMenuIfOpen}/>
            <Route path="contact" component={Contact} onEnter={closeMenuIfOpen}/>
        </Route>
        <Route path="/app" component={AuthenticatedAppContainer}>
            <Route path="chat/:interlocutorId" component={ChatContainer} onEnter={closeMenuIfOpen}/>
            <Route path="dashboard" component={Dashboard} onEnter={closeMenuIfOpen}/>
            <Route path="profile/:userId" component={UserProfile} onEnter={closeMenuIfOpen}/>
            <Route path="editProfile/:userId" component={EditProfile} onEnter={closeMenuIfOpen}/>
            <Route path="users" component={Users} onEnter={closeMenuIfOpen}/>
            <Route path="challenges" component={Challenges} onEnter={closeMenuIfOpen}/>
            <Route path="competitions" component={CompetitionList} onEnter={closeMenuIfOpen}/>
            <Route path="competitions/create" component={CompetitionForm} onEnter={closeMenuIfOpen}/>
            <Route path="competitions/view/:competitionId" component={CompetitionContainer} onEnter={closeMenuIfOpen}/>
        </Route>
    </Router>
);