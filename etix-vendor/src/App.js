import './App.css';
import React, {Box} from 'react';   
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Footer from './components/Footer/Footer';
import Header from './components/Header/header';
import Register from './components/Register/Register';
import RegistrationSuccess from './components/Register/RegisterSuccess';
import VendorMenu from './components/VendorMenu/VendorMenu';
import DataGeneration from './components/DataGeneration/DataGeneration';
import Service from "./components/ServiceManagement/Service";
import HelpdeskDetail from "./components/Helpdesk/HelpdeskDetail";
import Help from './components/HelpMan/Help';
import Landing from './components/HelpCenter/Landing'
import Profile from "./components/Profile/Profile";
import {CookiesProvider} from 'react-cookie'
import ServicesManagement from './components/ServiceManagement/ServicesManagement';
import HelpManagement from './components/HelpMan/HelpManagement';
import AddComment from './components/Helpdesk/AddComment';
import AddService from './components/ServiceManagement/AddService';

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
          <Header />
          <NavBar />
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/menu" component={VendorMenu}  />
                <Route exact path="/register" component={Register}/>
                <Route exact path="/register/registersuccess" component={RegistrationSuccess}/>
                <Route exact path="/forgotpassword" component={ForgotPassword}/>
                <Route exact path="/menu/servicemanagement" component={ServicesManagement}/>
                <Route exact path="/menu/helpdesk" component={Help}/>
                <Route exact path="/menu/helpdesk/:id" component={HelpdeskDetail}/>
                <Route exact path="/helpcentre" component={Landing}/>
                <Route exact path="/menu/helpmanage" component={HelpManagement}/>
                <Route exact path="/menu/profile" component={Profile}/>
                <Route exact path="/menu/helpmanage/comment/:id" component={AddComment}/>
                <Route exact path="/menu/servicemanagement/add" component={AddService}/>
                <Route exact path="/menu/servicemanagement/:id" component={Service} />
              </Switch>
            <Footer />    
          </BrowserRouter>
      </CookiesProvider>
      </div>
    </div>
  );
}

export default App;

