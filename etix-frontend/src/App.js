import logo from './logo.svg';
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
import Privacy from '../src/components/PrivacyPolicy/PrivacyPolicy'
import Passport from '../src/components/Passport/Passport'
import Retrieval from '../src/components/Passport/Retrieval'
import PopularAttractions from '../src/components/PopularAttractions/PopularAttractions'
import PopularServices from '../src/components/PopularServices/PopularServices'
import HelpCenter from '../src/components/HelpCenter/Landing'
import Messaging from '../src/components/HelpCenter/Messaging'
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart'
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
        <Route path="/verification" exact>
            <Verification />
        </Route>
        <Route path="/homequery" exact>
            <HomeQuery />
        </Route>
        <Route path="/attractions" exact>
            <PopularAttractions />
        </Route>
        <Route path="/privacyPolicy" exact>
            <Privacy />
        </Route>
        <Route path="/passport" exact>
            <Passport />
        </Route>
        <Route path="/passport/retrieval" exact>
            <Retrieval />
        </Route>
        <Route path="/searchquery" exact>
            <SearchQuery />
        </Route>
        <Route path="/services" exact>
            <PopularServices />
        </Route>
        <Route path="/helpcentre" exact>
            <HelpCenter />
        </Route>
        <Route path="/helpcentre/messaging" exact>
            <Messaging />
        </Route>
        <Route path="/profile" exact>
            <Profile />
        </Route>
        <Route path="/cart" exact>
            <Cart />
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
        <Router />
      </div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </div>
  );
}

export default App;
