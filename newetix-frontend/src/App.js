import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Homepage
import HomeQuery from './components/HomeServices/HomeQuery';
import HomeOperators from './components/HomeServices/Operators';
// Popular Attractions
import Attractions from './components/Static/Attractions';
// Passport & Retrieval
import Passport from './components/Passport/Passport';
// Routes
import RouteQuery from './components/RouteQuery/RouteQuery';
// Help Center
import HelpLanding from './components/HelpCenter/Landing'
import HelpMessaging from './components/HelpCenter/Messaging'
import HelpDetail from './components/HelpCenter/Detail'
// Profile
import Profile from './components/Profile/Profile'
// Cart
import Cart from './components/Cart/CartLanding'
import Success from './components/Cart/Success'
// Activities
import Activities from './components/Activities/Activities'
import Ticket from './components/Ticketing/Ticket'
import ForgetPass from './components/ForgetPassword/ForgetPass';
// Actions
import { customerDetails, viewCartData, getTickets, getAllRoutes, getLocations, cartDispatch } from './state/actions/actions';
import { useDispatch } from 'react-redux';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#1c183f'
        },
        secondary: {
          main: '#f5cb5c'
        },
    },
    typography: {
        fontFamily: 'Rubik'
    }
})

function Router() {
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <HomeQuery />
                    <HomeOperators />
                </Route>
                <Route path="/attractions" exact>
                    <Attractions />
                </Route>
                <Route path="/passport" exact>
                    <Passport />
                </Route>
                <Route path="/routes/:fromm/:too/:datee" exact>
                    <RouteQuery />
                </Route>
                <Route path="/help" exact>
                    <HelpLanding />        
                </Route>
                <Route path="/help/inbox" exact>
                    <HelpMessaging />
                </Route>
                <Route path="/help/message/:id" exact>
                    <HelpDetail />
                </Route>
                <Route path="/help/articles/:id" exact>
                    <RouteQuery />
                </Route>
                <Route path="/profile" exact>
                    <Profile />
                </Route>
                <Route path="/cart" exact>
                    <Cart />
                </Route>
                <Route path="/cart/payment/success" exact>
                    <Success />
                </Route>
                <Route path="/ticket/:id" exact>
                    <Ticket />
                </Route>
                <Route path="/activities" exact>
                    <Activities />
                </Route>
                <Route path="/forgotpass" exact>
                    <ForgetPass />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

function App() {
    return(
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    )
}

export default App;