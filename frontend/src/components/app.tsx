import * as React from "react";

import {BrowserRouter, Route, Switch} from "react-router-dom";

import HomePage from "./pages/homePage"
import WikiwarPage from "./pages/wikiwarPage"
import NotFoundPage from "./pages/notFoundPage"
import NavBar from "./shared/navBar";

function App() {
    const [graphPath, setGraphPath] = React.useState([]);

    return (
        <BrowserRouter>
            <>
                <Route component={NavBar}/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/wikiwar"
                           render={() => <WikiwarPage graphPath={graphPath} setGraphPath={setGraphPath}/>}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </>
        </BrowserRouter>
    );
}

export default App;