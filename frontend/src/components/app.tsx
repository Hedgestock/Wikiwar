import * as React from "react";

import {BrowserRouter, Route, Switch} from "react-router-dom";

import HomePage from "./pages/homePage"
import WikiwarPage from "./pages/wikiwarPage"
import NotFoundPage from "./pages/notFoundPage"
import NavBar from "./shared/navBar";

function App() {
    return (
        <BrowserRouter>
            <>
                <Route component={NavBar}/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/wikiwar" component={WikiwarPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </>
        </BrowserRouter>
    );
}

export default App;