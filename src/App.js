import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/home";
import Dashboard from "./pages/admin";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route >
                    <Home />
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
