import React, {useState, useEffect} from 'react';
import { AppBar, Grid, IconButton, Link, Typography, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import etixLogo from '../../globalAssets/eTixLogo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { viewCartData } from '../../../state/actions/actions';

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
        paddingRight: '75px',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        justify: 'center',
    },
    auxContainer: {
        paddingTop: '25px',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent:'center',
    },
}));

function Nav() {
    const defaultStyle = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const cartD = useSelector(state => state.viewCartData);
    const {cartData} = cartD;
    const removeItem = useSelector(state => state.removeItem);
    const {success: removeSuccess} = removeItem;
    const cartAdd = useSelector(state => state.cartAdd);
    const {success: addcartSuccess} = cartAdd;
    const [cartItemPax, setcartItemPax] = useState("");
    const [isHome, setHome] = useState(true);
    const [isAttract, setAttract] = useState(false);
    const [isServ, setServ] = useState(false);
    const [isCart, setCart] = useState(true);

    useEffect(() => {
        if(userInfo){
            dispatch(viewCartData());
        }
    }, [userInfo, addcartSuccess, removeSuccess])

    useEffect(() => {
        if(cartData !== null){
            if(cartData || addcartSuccess || removeSuccess){
                let cartpax = Object.keys(cartData).length;
                if(cartpax > 0){
                    setcartItemPax(cartpax);
                }else {
                    setcartItemPax('0');
                }
            }   
        }
        
        console.log(cartItemPax);
    }, [addcartSuccess, removeSuccess, cartData])

    function cartOnClick() {
        setCart(true);
        setHome(false);
        setServ(false);
        setAttract(false);
        history.push('/cart')
    }

    const handleHome = () => {
        setHome(true);
        setServ(false);
        setCart(false);
        setAttract(false);
    }

    return (
        <Grid className={defaultStyle.customizeAppbar} container justify="center" direction="row" alignItems="center" display="flex">
            <Grid item xs={2}>
                <Link href='http://localhost:3000/'         
                    style={{ textDecorationLine: 'none', display: "flex",}}>        
                    <img src={etixLogo} className={defaultStyle.resizePic} alt="eTix Logo"/>
                    <Typography className={defaultStyle.resizeLogo} variant="h2" sx={{ flexGrow: 1 }} style={{fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                        eTix 
                    </Typography>
                </Link>
            </Grid>
   
            <Grid onClick={handleHome} item xs={3} className={defaultStyle.menuItems}><Link href='http://localhost:3000/' style={isHome?{ textDecorationLine: 'none', color: 'yellow', display: "flex",}:{ textDecorationLine: 'none', color: 'white', display: "flex",}}>HOME</Link></Grid>
            <Grid item xs={3} className={defaultStyle.menuItems}><Link href='http://localhost:3000/attractions' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>ATTRACTIONS</Link></Grid>
            <Grid item xs={3} className={defaultStyle.menuItems}><Link href='http://localhost:3000/services' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>SERVICE</Link>
            </Grid>     
            <Grid item xs={1} className={defaultStyle.auxContainer} justify="space-between">
                {userInfo?<IconButton><Badge badgeContent={cartItemPax} color="primary">
                    <ShoppingCartIcon sx={!isCart?{color: 'white', fontSize: '35px'}:{color: 'yellow', fontSize: '35px'}} onClick={cartOnClick} />
                </Badge></IconButton>:null}
             </Grid>
        </Grid>
    );

}

export default Nav;
