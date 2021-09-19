import './App.css';
import React from 'react';
import Header from '../src/components/Homepage/Header/header'
import NavBar from '../src/components/Navbar/navbar'
import Footer from '../src/components/Footer/Footer'
import { SearchQuery } from '../src/components/SearchQuery/SearchQuery';
import Verification from '../src/components/verification_form/Verification'
import Activities from '../src/components/Activities/Activities'
import { Operators } from '../src/components/operators/Operators'         
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import AboutUs from '../src/components/AboutUs/AboutUs'
import HomeQuery from '../src/components/HomeQuery/HomeQuery'
import { makeStyles } from "@material-ui/core";

function Router() {
  return (
    <BrowserRouter>
    <Header />
    <NavBar />
    <Switch>
        <Route path="/" exact>
            <HomeQuery />
            <Operators />
        </Route>
        <Route path="/aboutUs" exact>
            <AboutUs />
        </Route>
        <Route path="/activities" exact>
            <Activities />
        </Route>
    </Switch>
    <Footer />
    </BrowserRouter>
  )
}

function App() {

  return (

    <div> 
      <div>
        <Header />
        <NavBar />

      </div>

        
    </div>

    
    
  );
}

export default App;
