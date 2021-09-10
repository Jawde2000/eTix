
import Header from './Header/header'
import NavBar from '../Navbar/navbar'
import HomeQuery from '../HomeQuery/HomeQuery'
import Footer from '../Footer/Footer'
import React from 'react'
import { Operators } from './operators/Operators'
            
            

function Homepage() {
    return (
        <div>
            <Header />
            <NavBar />
            <HomeQuery />
            <Operators />
            <Footer />
        </div>
    )
}

export default Homepage
