import React from 'react';
import HomeQuery from './HomeServices/HomeQuery';
import Header from './Header/Header';
import Operators from './HomeServices/Operators';
import Footer from './Footer/Footer';

function Test(){
    return(
        <div>
            <Header></Header>
            <Operators />
            <Footer></Footer>
        </div>
    )
}

export default Test;
