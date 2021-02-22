import React from 'react';
import { Route, Switch } from 'react-router-dom';


import HomeView from './HomeView';
import GameForm from './GameForm';
import CharForm from './CharForm';
import QuoteForm from './QuoteForm';
import Error404View from './Error404View';
import GamesView from './GamesView';
import QuoteAndCharView from './QuoteAndCharView';



function Routes(props) {
    
    //Many of this routes send props up to App.js, so App can send them back down to Routes, 
    //and further down to other children that can't communicate amongst themselves.

    //Many of these also get game as props, which is the object that App.js is "returning" down. 

    
    return (
        <Switch>
            {/* Home: Use 'exact' or else this route will match EVERYTHING */}
            <Route path="/" exact>
                <HomeView />
            </Route>
    
            {/* GameForm */}
            <Route path="/game_form">
                <GameForm game = {props.game}
                getGame={(g) => props.onGetGame(g)}/>
            </Route>
    
            {/* CharForm */}
            <Route path="/character_form">
                <CharForm game = {props.game}
                getGame={(g) => props.onGetGame(g)}
                />
            </Route>

            {/* QuoteForm */}
            <Route path="/quote_form">
                <QuoteForm 
                game = {props.game} 
                getGame={(g) => props.onGetGame(g)}/>
            </Route>

             {/* Games list */}
             <Route path="/games">
                <GamesView  getGame={(g) => props.onGetGame(g)}  />
            </Route>

             {/* Inside a Game */}
             <Route path={`/quoteandchar/${props.game.id}`}>
                <QuoteAndCharView game = {props.game}/>
            </Route>

             {/* Inside a Game from the URL ID*/}
            <Route path='/quoteandchar/:id(\d+)' render={(routeProps) => {

                //This is made to be able to have the game id on the url. Generally, the route /quoteandchar/ID is defined with a game id that 
                //comes from props, which comes from an "onClick" from GamesView.

                //If we were to enter quotesandchar/3 directly, without clicking on game 3, it will go through this route, as it gets
                //the prop it needs from the url instead of from the parent. 
                let id = Number(routeProps.match.params.id);
            
                return <QuoteAndCharView gameId = {id} />
            }} />

            {/* None of the routes matched: Error 404! */}
            <Error404View />
        </Switch>
    );
}


export default Routes;