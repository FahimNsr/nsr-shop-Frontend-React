import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/home";

function App() {
    return (
        <div className="p4">
            <div className=" container">
                <BrowserRouter>
                    <Switch>
                        <Route>
                            <Home />
                        </Route>
                        <Redirect from="*" to="/" />
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
