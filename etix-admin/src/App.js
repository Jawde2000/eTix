import './App.css';
import React from 'react';   
import {Route, BrowserRouter, useHistory, Switch} from 'react-router-dom';
import AdminMenu from './components/adminMenu/AdminMenu';
import {useCookies} from 'react-cookie'

import Topbar from './components/NavBar/Topbar'
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'
import UserManagement from './components/userManagement/UserManagement';
import Helpdesk from './components/Helpdesk/HelpdeskDetail';
import Sales from './components/Sales/Sales'
import Service from './components/Service/Service';
import ServiceMan from './components/ServiceMan/Services'
import User from './components/User/UserDetail'
import DataGenerationService from './components/DataGeneration/DataGenerationService';
import {CookiesProvider} from 'react-cookie'
import Help from './components/HelpMan/Help';



function App() {
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let history = useHistory()



  return (
    <div> 
      <div>
        <CookiesProvider>
          <BrowserRouter>
            <Topbar />
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/menu" component={AdminMenu}  />
                <Route exact path="/menu/sales" component={DataGenerationService} />
                <Route exact path="/menu/servicemanagement" component={ServiceMan} />
                <Route exact path="/menu/users" component={UserManagement} />
                <Route exact path="/menu/helpdesk" component={Help} /> 
              </Switch>
            <Footer />    
          </BrowserRouter>
      </CookiesProvider>
      </div>
    </div>
  );
}

export default App;

