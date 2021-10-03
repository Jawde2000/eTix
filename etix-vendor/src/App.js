import './App.css';
import React, {Box} from 'react';   
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import Footer from './components/Footer/Footer'
import Header from './components/Header/header'
import Register from './components/Register/Register';
import RegistrationSuccess from './components/Register/RegisterSuccess'
import VendorMenu from './components/VendorMenu/VendorMenu'
import DataGeneration from './components/DataGeneration/DataGeneration'

function Router() {

  return (
    <BrowserRouter>
    <Header />
    <NavBar />
    <Route path="/" exact>
      <Login />
    </Route>
    <Route path="/forgotpassword" exact>
      <ForgotPassword />
    </Route>
    <Route path="/register" exact>
      <Register />
    </Route>
    <Route path="/registrationsuccess" exact>
      <RegistrationSuccess />
    </Route>
    <Route path="/menu" exact>
      <VendorMenu />
    </Route>
    <Route path="/datageneration" exact>
      <DataGeneration />
    </Route>
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

