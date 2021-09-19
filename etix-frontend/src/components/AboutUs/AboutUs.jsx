import React, { Component } from 'react'
import { makeStyles, Typography, Box, Container, Button, Divider, Link} from "@material-ui/core";
import tokyoNight from '../globalAssets/tokyoNight.jpg'
import mmu from '../globalAssets/mmu.jpg'
import bus from '../globalAssets/bus.jpg'


const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: 'url('+ tokyoNight +')',
        backgroundRepeat: "no-repeat",
        height: 2000,
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    slogan: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 20,
        color: '#FFF',
    },
    slogans: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 60,
        color: '#F5CB5C'
    },
    cnSlogans: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 25,
        color: '#F5CB5C'
    },
    para: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 35,
    },
    para2: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 35,
        color: '#ADD8E6',
    },
    para2Background: {
        backgroundImage: 'url('+ bus +')',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        opacity: 1,
        marginRight: 30,
        marginLeft: 30,
        borderRadius: 50
    },
    mmuBackground: {
        backgroundImage: 'url('+ mmu +')',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        marginRight: 30,
        marginLeft: 30,
        borderRadius: 50,
    },
    mmuTitle: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        color: '#ADD8E6',
        fontSize: 30,     
        paddingBottom: 70,
    },
    mmuLearnMore : {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        color: '#FFF',
        backgroundColor: 'black',
        fontSize: 14,
        padding: 15,  
        maxHeight: 60, 
        maxWidth: 200,
        borderRadius: 50,    
        '&:hover': {
            backgroundColor: '#fff',
            color: 'black',
        },
    },
    divider: {
        paddingLeft: 30,
        paddingRight: 30,
    }
}));

function AboutUs() {
    const defaultStyle = useStyles();

    return(
        <div>
        <Box className={defaultStyle.whole}>
            <Box sx={{ padding: 100 }} variant="contained">
            <Typography className={defaultStyle.slogan}>
                Our Slogan
            </Typography>
            <Typography className={defaultStyle.slogans}>
                One smooth ticket for your Ultimate Journey 
            </Typography>
            <Typography className={defaultStyle.cnSlogans}>
                一張暢通無阻的車票，開啟您的終極旅程
            </Typography>
            </Box>
            <Divider className={defaultStyle.divider} variant="inset"/>
            <Box sx={{ padding: 100 }} variant="contained">
                <Typography className={defaultStyle.para}>
                    eTix is a bus ticket purchasing system developed by Pengeema Technologies made with convenience in mind. We ensure we will always find a way to 
                    help the people all around the world with innovation.
                </Typography>
            </Box>
            <Box sx={{ padding: 100 }} variant="contained" className={defaultStyle.para2Background}> 
                <Typography className={defaultStyle.para2}>
                    Many problems faces by the transportation industry in this 21st century especially Covid-19 Pandemic in the current global. At eTix, 
                    We are promoting contactless services in order to achieve good hygiene among the people involved in the transportation industry in 
                    the new normal environment.
                </Typography>
            </Box>
            <Box sx={{ padding: 100 }} variant="contained"> 
                <Typography className={defaultStyle.para} color='#CFDBD5'>
                    With good faith, eTix is made for our Final Year Project in MMU Trimester 2020 by Pengeema Technologies, which consists of 
                    Chew Zhi Peng, Ho Ko Ee and Matthew Labial John.
                </Typography>
            </Box>
            <Box sx={{ padding: 100 }} variant="contained" className={defaultStyle.mmuBackground}>
            <Typography className={defaultStyle.mmuTitle}>
               Multimedia University Cyberjaya Campus
            </Typography>
            <Link className={defaultStyle.mmuLearnMore} href='https://www.mmu.edu.my/' variant="contained" underline={'none'} >
                Learn More
            </Link>
            </Box>
        </Box>
        </div>
    );
}

export default AboutUs;

