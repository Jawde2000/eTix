import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from 'react-cookie';
import {Route, BrowserRouter, useHistory, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Topbar from './components/NavBar/Topbar';


ReactDOM.render(
  
  <React.StrictMode>
    <CookiesProvider>
     
        <BrowserRouter>
          <Topbar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/menu" component={App}  />
            </Switch>
            <Footer />
            
          </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
