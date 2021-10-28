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
import Service from "./components/Service/Service";
import HelpdeskDetail from "./components/Helpdesk/HelpdeskDetail";
import Profile from "./components/Profile/Profile";
import {CookiesProvider} from 'react-cookie'

function Router() {

  return (
    <BrowserRouter>
    <Header />
    <NavBar />
    <Route path="/" exact>
      <Login />
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
    <Route path='/profile' exact>
      <Profile />
    </Route>
    <Route path='/profile' exact>
      <Profile />
    </Route>
    <Footer />
    </BrowserRouter>
  )
}



function App() {

  return (
    <div> 
      <div>
      <CookiesProvider>
          <BrowserRouter>
          <Switch>
             <Route exact path="/menu" component={Header}/>
          </Switch>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/menu" component={VendorMenu}  />
                <Route exact path="/register" component={Register}/>
                <Route exact path="/register/registersuccess" component={RegistrationSuccess}/>
                <Route exact path="/forgotpassword" component={ForgotPassword}/>
              </Switch>
            <Footer />    
          </BrowserRouter>
      </CookiesProvider>
      </div>
    </div>
  );
}

export default App;

