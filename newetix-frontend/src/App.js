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
import Payment from './components/Cart/Payment'
// Debugging


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
                <Route path="/routes" exact>
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
                <Route path="/cart/payment" exact>
                    <Payment />
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