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
// Debugging
import Test from './components/Test';

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