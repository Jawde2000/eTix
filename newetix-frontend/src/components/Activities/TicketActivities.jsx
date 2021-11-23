import React, {useState, useEffect} from 'react'
import { makeStyles, styled } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Paper, Stack, Pagination, CircularProgress } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { getTickets, getAllRoutes } from '../../state/actions/actions';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'black',
        borderRadius: '5px',
        width: '95%'
    }
}));

function TicketActivities() {
    const classes = useStyles();
    let history = useHistory()
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const ticketList = useSelector(state => state.getTickets)
    const {userInfo} = userLogin
    const {ticketData} = ticketList

    const [listofTickets, setListofTickets] = useState([])
    const [loadStatus, setLoadStatus] = useState(true)

    let hasTickets = false
    let reallyhasTickets = false


    useEffect(() => {
        if(!userLogin) {
            history.push('/')
        } else {
            dispatch(getTickets())
        }
    }, [dispatch])

    useEffect(() => {
        if (ticketData){
            setListofTickets(ticketData.tickets)
            setLoadStatus(false)
        }
    }, [ticketList])

    let routeIndex = 0
    let fromIndex = 0
    let toIndex = 0
    let vendorIndex = 0

    const handleRender = (item) => {
        if (!loadStatus){
            for (var i in ticketData.routes){
                if (ticketData.routes[i].serviceID == item.service) {
                    routeIndex = i
                }
            }
    
            for (var k in ticketData.locations) {
                if (ticketData.locations[k].locationID == ticketData.routes[routeIndex].locationFrom){
                    fromIndex = k
                } 
                
                if (ticketData.locations[k].locationID == ticketData.routes[routeIndex].locationTo) {
                    toIndex = k
                }
            }

            for (var l in ticketData.vendorD) {
                if (ticketData.vendorD[l].vendorID == item.vendor) {
                    vendorIndex = l
                }
            }
        }
    }

    return (
            <Grid container direction="column" justifyContent="center" alignItems="center" >
                {ticketData?
                    (ticketData.tickets.map((item, index) => {
                        hasTickets = false

                        handleRender(item)

                        if (item.ownBy == userInfo.userID){
                            hasTickets = true
                            reallyhasTickets = true
                        }
                        return (<>
                                {hasTickets?
                                    <Grid item className={classes.whole} sx={{marginBottom: '24px'}}>
                                        {handleRender(item)}
                                        <Grid container direction="row">
                                            <Grid item xs={3}>
                                                <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                                    <Grid item >
                                                        <img 
                                                            src={`https://etixbucket.s3.amazonaws.com/etix/${item.service}.png`}
                                                            alt={`serviceLogo - ${ticketData.vendorD[vendorIndex].vendorName}`}
                                                            style={{margin: 10, height: '90%', width:'90%',}}
                                                        /> 
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography style={{fontSize: 15, color: 'white'}}>
                                                            {ticketData.vendorD[vendorIndex].vendorName}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                
                                            </Grid>
                                            <Grid item xs={9} container style={{color: 'white', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                                <Grid item xs={12} >
                                                    <Typography style={{fontSize: 30}}>
                                                        {ticketData.routes[routeIndex].serviceName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Typography style={{fontSize: 20}}>
                                                        {`${ticketData.locations[fromIndex].locationName} - ${ticketData.locations[toIndex].locationName}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} container>
                                                    <Grid item xs={12} style={{textAlign: 'right'}} >
                                                        <QrCode2Icon fontSize='large' sx={{fontSize: '75px'}} onClick={(() => history.push(`/ticket/${item.ticketID}`))} />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid item xs={12}>
                                                        <Grid item xs={8}>
                                                            <Typography style={{fontSize: 20}}>
                                                                {`To Board: ${ticketData.routes[routeIndex].serviceStartDate} / ${ticketData.routes[routeIndex].serviceTime}`}
                                                            </Typography>
                                                        </Grid> 
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {hasTickets = false}
                                    </Grid>
                                    :
                                    ''
                                }
                            </>)
                    }))
                :
                    <CircularProgress />
                }
                {reallyhasTickets?
                    ''
                :
                    <Grid item><Typography variant="h4">Buy a ticket now!</Typography></Grid>
                }
            </Grid>
        );
}

export default TicketActivities
