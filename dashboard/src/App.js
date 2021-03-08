import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Launcher from "./Launcher";
import Home from "./Home";
import Splash from "./Splash";

export default function App() {
    return (
        <BrowserRouter>
            <Route path="/app" component={Home} />
            <Route path="/launch" component={Launcher} exact />
            <Route path="/" component={Splash} exact />
        </BrowserRouter>
    );
};