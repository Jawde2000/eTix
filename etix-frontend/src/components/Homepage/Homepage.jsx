
import Header from './Header/header'
import NavBar from '../Navbar/navbar'
import React from 'react'
import { Operators } from './operators/Operators'
            
            

function Homepage() {
    return (
        <div>
            <Header />
            <NavBar />
            <Operators />
        </div>
    )
}

export default Homepage
