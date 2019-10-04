import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from "./App";
import MovieDetails from './MovieDetails';


ReactDOM.render((
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/movie/:id/:tconst' component={MovieDetails}/>
        </Switch>
      </main>
    </BrowserRouter>), 
document.getElementById("root"));

