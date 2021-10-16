import React from 'react';
import { AppBar, Grid, IconButton, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import etixLogo from '../../globalAssets/eTixLogo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    customizeAppbar: {
        minHeight: 130,
        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        position: 'relative',
        paddingRight: 150,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        boxShadow: 'none'
    },
    resizePic: {
        width: 118.5,
        height: 57.375,
        paddingLeft: 40,
        paddingTop: 30,
    },
    resizeLogo: {
        color: '#CFDBD5',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        paddingTop: 30,
    },
    display: {
        display: "flex",
        align: "center"
    },
    rightClock: {
        float: "right"
    },
    menuContainer: {
        paddingLeft: '250px',
        paddingRight: '250px',
        paddingTop: '25px'
    },
    menuItems: {
        fontSize: '20px',
        paddingLeft: '125px',
        paddingRight: '75px'
    },
    auxContainer: {
        paddingTop: '25px'
    }
}));

function Nav() {
    const defaultStyle = useStyles();

    return (
        <AppBar className={defaultStyle.customizeAppbar} position="relative">
            <Grid xs={12} container justify="center" direction="row" alignItems="center">
                <Grid item>
                    <Link href='http://localhost:3000/'         
                        style={{ textDecorationLine: 'none', display: "flex",}}>        
                        <img src={etixLogo} className={defaultStyle.resizePic} alt="eTix Logo"/>
                        <Typography className={defaultStyle.resizeLogo} variant="h2" sx={{ flexGrow: 1 }} style={{fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                            eTix 
                        </Typography>
                    </Link>
                </Grid>
                <Grid item className={defaultStyle.menuContainer}>
                    <Grid xs={12} container justify="center" direction="row" alignItems="center">
                        <Grid item className={defaultStyle.menuItems}><Link href='http://localhost:3000/' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>HOME</Link></Grid>
                        <Grid item className={defaultStyle.menuItems}><Link href='http://localhost:3000/attractions' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>ATTRACTIONS</Link></Grid>
                        <Grid item className={defaultStyle.menuItems}><Link href='http://localhost:3000/services' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>SERVICE</Link></Grid>
                    </Grid>
                </Grid>
                <Grid item className={defaultStyle.auxContainer}>
                    <IconButton><ShoppingCartIcon sx={{color: 'white', fontSize: '35px'}} color="inherit"></ShoppingCartIcon></IconButton>
                </Grid>
            </Grid>
        </AppBar>
    );

}

export default Nav;
