import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './App.css'
import Test from './components/Test'

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
    //return()
}

function App() {
    return(
        <ThemeProvider theme={theme}>
            <Test></Test>
        </ThemeProvider>
    )
}

export default App;