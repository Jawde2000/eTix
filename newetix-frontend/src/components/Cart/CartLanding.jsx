import React, {useState, useEffect, useRef} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Alert, CircularProgress, Tooltip, InputLabel, Select, MenuItem, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import images from '../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { paymentSuccess, removeItem, viewCartData } from '../../state/actions/actions'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import { routeLookupReducer } from '../../state/reducers/routeReducers';
import {DELETE_CART_RESET, CART_VIEW_RESET} from '../../state/actions/actionConstants';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    inside: {
      paddingTop: '2.5%',
      paddingBottom: '2.5%'
    },
    sect: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'white'
    },
    cartItems: {
        width: '400px',
        paddingBottom: '25px'
    },
    tf: {
        width: '550px'
    }
}));

export const seatIdentifier = (seatType) => {
    if (seatType == 'F') {
        return 'First Class'
    } else if (seatType == 'B') {
        return 'Business Class'
    } else if (seatType == 'E') {
        return 'Economy Class'
    }

    return 'null'
}

function CartLanding() {
    const paypal = useRef()
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory()
    const clist = useSelector(state => state.viewCartData)
    const cuslist = useSelector(state => state.customerDetails)
    const allr = useSelector(state => state.getAllRoutes)
    const RemoveItem = useSelector(state => state.removeItem);
    const {success: successDelete} = RemoveItem;
    const cartAdd = useSelector(state => state.cartAdd)
    const {loading: addLoading, success: addSuccess} = cartAdd
    const {cartData} = clist
    const {customerInfo} = cuslist
    const {route, loading: loadingRoute} = allr
    const [cartItems, setcartItems] = useState()
    const [filteredcartData, setfilteredcartData] = useState()
    const [address, setAddress] = useState(null)
    const [serviceList, setServiceList] = useState(null)
    const [total, setTotal] = useState(0)
    const [payment, setPayment] = useState(0)
    const [cartID, setCartID] = useState('')
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if(cartData) {
            dispatch(viewCartData());
        }       
    }, [successDelete])

    useEffect(() => {
        if(addSuccess){
            dispatch(viewCartData());
        }
    }, [addSuccess])

    useEffect(() => {
        if(successDelete) {
            dispatch({type: DELETE_CART_RESET})
            dispatch({type: CART_VIEW_RESET})
        }
    }, [successDelete])
    
    useEffect(async () => {
        let totaltemp = 0
        let taxtemp = 0
        let etixtemp = 0
        let cd = []
        if (cartData){
            setcartItems(cartData)
            for (let i in cartData){
                totaltemp = parseFloat(cartData[i].seat_price) + parseFloat(totaltemp)
            }
            setTotal((parseFloat(totaltemp)).toFixed(2))
            
            if (!cartData){
                setReady(false)
            } else {
                setCartID(cartData[0].cart)
                setReady(true)
            }

            if (route) {
                for (let i in cartData){
                    for (let j in route) {
                        if (cartData[i].service == route[j].serviceID){
                            cd.push(route[j])
                        }
                    }
                }
                setfilteredcartData(cd)
            }
        }

        if (customerInfo) {
            setAddress(customerInfo.customerAddress)
        }
        
        if (!cuslist.loading && !(customerInfo)) {
            history.push('/')
        }

        if (route) {
            setServiceList(route)
        }
    }, [cartData, route, customerInfo])

    const handleRemove = (itemID) => {
        dispatch(removeItem(itemID))
        alert("Item deleted from cart!")
    }

    const handleSuccess = () => {
        dispatch(paymentSuccess(cartID,total))
        history.push('/cart/payment/success')
    }

    const handleFailure = (err) => {
        alert("Payment failure, this is most likely to be a problem with your banking details, please check with PayPal")
        console.log(err)
    }

    useEffect(() => {
        if (ready){
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: "eTix Ticket",
                        amount: {
                          currency_code: "MYR",
                          value: (total),
                        },
                      },
                    ],
                  });
                },
                onApprove: async (data, actions) => {
                    handleSuccess()
                },
                onError: (err) => {
                    handleFailure(err)
                },
              })
              .render(paypal.current);
        }
    }, [ready]);

    return (
        <Box className={classes.whole}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.inside}>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item>
                                    <ShoppingCartIcon fontSize='large' sx={{fontSize: '75px'}} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4">Cart</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={`${classes.sect} ${classes.cartItems}`}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={6}>
                                <Grid item>
                                    <Typography variant="h4" sx={{color: 'rgb(245, 203, 92)'}}>Items</Typography>
                                </Grid>
                                    {cartItems? 
                                        cartItems.map((item, index) => {
                                            return (
                                                <Grid item>
                                                    <Grid container direction='row' justifyContent="center" alignItems="center" spacing={4}>
                                                        <Grid item>
                                                            <Typography variant="h6">Service ID: {item.service}</Typography>
                                                            <Typography variant="h6">{seatIdentifier(item.seat_Type)} Ticket</Typography>
                                                            <Typography variant="h6">RM {item.seat_price}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Tooltip title="Remove">
                                                                <HighlightOffIcon onClick={() => {handleRemove(item.cartItemsID)}} />
                                                            </Tooltip>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    :
                                    <Grid item>
                                        <Typography variant="h6">Add items to your cart!</Typography>
                                    </Grid>
                                    }
                                <Grid item>
                                    <Grid container direction='column' justifyContent="center" alignItems="center" spacing={4}>
                                        <Grid item>
                                            <Typography variant="h4" sx={{color: 'rgb(245, 203, 92)'}}>Total</Typography>
                                            <Typography variant="h4" sx={{color: 'rgb(245, 203, 92)'}}>RM {total}</Typography>
                                            <Typography variant="h8" sx={{color: 'rgb(245, 203, 92)'}}>Total includes 6% SST <br /> and 1% eTix Charge</Typography>
                                        </Grid>
                                    
                                
                                        {address?
                                            <Grid item sx={{marginLeft: '15px', paddingRight: '150px'}}>
                                                <Typography align="left" variant="h5">Address: </Typography>
                                                <Typography align="left" variant="h5">{address}</Typography>
                                            </Grid>

                                        :
                                            <Alert severity="error" sx={{marginLeft: '35px', width: '350px'}}>Important info is missing, please go to your profile to provide them!</Alert>
                                        }
                                    </Grid>
                                </Grid>
                                {address?
                                    <Grid item>
                                        <div ref={paypal} sx={{width: '90%'}}/>
                                    </Grid>
                                :
                                    ''
                                }
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    {
                        filteredcartData?
                        (
                            filteredcartData.map((item, index) => {
                                return (
                                    <Grid item xs={12} container style={{background: 'linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))', margin: 10}}>
                                        <Grid item xs={3}>
                                            <img 
                                                src={`https://etixbucket.s3.amazonaws.com/etix/${item.serviceID}.png`}
                                                alt={`serviceLogo${item.vendor}`}
                                                style={{margin: 10, height: 170, width:300,}}
                                            />
                                        </Grid>
                                        <Grid item xs={9} container style={{color: 'white', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                            <Grid item xs={12} >
                                                <Typography style={{fontSize: 30}}>
                                                    {item.vendorD.vendorName}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Typography style={{fontSize: 20}}>
                                                    {`${item.servicedepartureTerminal} - ${item.servicearrivalTerminal}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} container>
                                                <Grid item xs={12} style={{textAlign: 'right'}} >
                                                    Service ID
                                                    <Typography style={{fontSize: 40}} >
                                                        {`${item.serviceID}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} container>
                                                <Grid item xs={12}  container>
                                                    <Grid item xs={8}>
                                                        <Typography style={{fontSize: 20}}>
                                                            {`Depart Time : ${item.serviceTime}`}
                                                        </Typography>
                                                    </Grid> 
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        )
                        :
                        (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        )
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default CartLanding
