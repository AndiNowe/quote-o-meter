import React from 'react';
import { Route, Switch } from 'react-router-dom';


import HomeView from './HomeView';
import GameForm from './GameForm';
import CharForm from './CharForm';
import QuoteForm from './QuoteForm';
import Error404View from './Error404View';



function Routes(props) {
    return (
        <Switch>
            {/* Home: Use 'exact' or else this route will match EVERYTHING */}
            <Route path="/" exact>
                <HomeView />
            </Route>
    
            {/* GameForm */}
            <Route path="/game_form">
                <GameForm />
            </Route>
    
            {/* CharForm */}
            <Route path="/character_form">
                <CharForm />
            </Route>

            {/* QuoteForm */}
            <Route path="/quote_form">
                <QuoteForm />
            </Route>
    
            {/* UserProfile: The easy way 
            <Route path="/users/:id(\d+)">
                <UserProfileView users={props.users} />
            </Route>

            {/* UserProfile: The "better" way 
            <Route path='/users/:id(\d+)' render={(routeProps) => {
                // Get ID from URL param
                let id = Number(routeProps.match.params.id);
                // Find user with that ID
                let user = props.users.find(u => u.id === id);
                // Return profile component with user passed as prop
                return <UserProfileView user={user} />
            }} />*/}

            {/* AddUserView 
            <Route path="/add-user">
                <AddUserView onAddUser={(name) => props.onAddUser(name)} />
            </Route> */}

            {/* None of the routes matched: Error 404! */}
            <Error404View />
        </Switch>
    );
}


export default Routes;