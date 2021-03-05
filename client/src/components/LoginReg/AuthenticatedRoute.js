import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Local from './helpers/Local';

export default function AuthenticatedRoute(props) {
    //Redirects to /login if it is an anonymous user
    let userId = Local.getUserId();
    if (!userId) {
        return <Redirect to="/login" />
    }

    //Render <Route> containing child component(s)
    return (
        <Route exact path={ rpops.path}>
            {props.children}
        </Route>
    )
};

