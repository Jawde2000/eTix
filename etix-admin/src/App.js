import './App.css';
import React, {Box} from 'react';   
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'
import AdminMenu from './components/adminMenu/AdminMenu';
import Header from './components/NavBar/Header';
import UserManagement from './components/userManagement/UserManagement';
import DataGeneration from './components/DataGeneration/DataGenerationService';
import Helpdesk from './components/Helpdesk/HelpdeskDetail';
import HelpMan from './components/HelpMan/Help';
import Sales from './components/Sales/Sales'
import Service from './components/Service/Service';
import ServiceMan from './components/ServiceMan/Service'
import User from './components/User/UserDetail'
import DataGenerationService from './components/DataGeneration/DataGenerationService';

function Router() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path={"/menu/users", "/menu"}>
        <Header />
      </Route>
    </Switch>
      <NavBar />
    <Switch>
    <Route path="/" exact>
      <Login />
    </Route>
    <Route path="/query" exact>
      <Service />
    </Route>
    <Route path="/data" exact>
      <DataGenerationService />
    </Route>
    <Route path="/helpdesk" exact>
      <Helpdesk />
    </Route>
    <Route path="/user" exact>
      <User />
    </Route>
    <Route path="/menu" exact>
      <AdminMenu />
    </Route>
    <Route path="/menu/servicemanagement">
      <ServiceMan />
    </Route>
    <Route path="/menu/helpdesk">
      <HelpMan />
    </Route>
    <Route path="/menu/sales">
      <Sales />
    </Route>
    <Route path="/menu/users" exact>
      <UserManagement />
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
    </div>
  );
}

export default App;

