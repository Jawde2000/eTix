import './App.css';
import React, {useEffect} from 'react';   
import {Route, BrowserRouter, useHistory, Switch} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AdminMenu from './components/adminMenu/AdminMenu';
import {useCookies} from 'react-cookie'

import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'
import Header from './components/NavBar/Header';
import UserManagement from './components/userManagement/UserManagement';
import Helpdesk from './components/Helpdesk/HelpdeskDetail';
import HelpMan from './components/HelpMan/Help';
import Sales from './components/Sales/Sales'
import Service from './components/Service/Service';
import ServiceMan from './components/ServiceMan/Service'
import User from './components/User/UserDetail'
import DataGenerationService from './components/DataGeneration/DataGenerationService';
import {CookiesProvider} from 'react-cookie'



function App() {
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let history = useHistory()

  //checking if it is logged in or not.
  useEffect(() => {
    if(!token['mytoken']) {
        history.push('/')
    }
  },[])

  return (
    <div> 
      <div>
        <AdminMenu />
      </div>
    </div>
  );
}

export default App;

