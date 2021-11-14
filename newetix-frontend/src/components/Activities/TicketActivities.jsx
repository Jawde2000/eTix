import React, {useState, useEffect} from 'react'
import { makeStyles, styled } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Paper, Stack, Pagination } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { helpdeskCreate, helpdeskList } from '../../state/actions/actions';


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
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const ticketList = useSelector(state => state.getTickets)
    const {userInfo} = userLogin
    const {ticketData} = ticketList

    const [listofTickets, setListofTickets] = useState([])

    let hasTickets = false
    let reallyhasTickets = false


    useEffect(() => {
        if(!userLogin) {
            history.push('/')
        }

        if (ticketData) {
            setListofTickets(ticketData.tickets)
        }

    }, [ticketData, userLogin])

    let vendorIndex = 0
    let routeIndex = 0
    let fromIndex = 0
    let toIndex = 0

    const handleRender = (item) => {
        console.log(item)
        console.log(ticketData)
        for (var i in ticketData.routes){
            if (ticketData.route[i].serviceID == item.service) {
                routeIndex = i
            }
        }

        for (var j in ticketData.vendorInfo) {
            if (ticketData.vendorInfo[j].vendorID == ticketData.route[routeIndex].vendor) {
                vendorIndex = j
            }
        } 

        for (var k in ticketData.location) {
            if (ticketData.locations[k].locationID == ticketData.route[routeIndex].locationFrom){
                fromIndex = k
                console.log(`${ticketData.locations[k].locationID} - ${ticketData.route[routeIndex].locationFrom}`)
            } 
            
            if (ticketData.locations[k].locationID == ticketData.route[routeIndex].locationTo) {
                toIndex = k
                console.log(`${ticketData.locations[k].locationID} - ${ticketData.route[routeIndex].locationTo}`)
            }
        }
    }

    return (
        <Stack spacing={2}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                {ticketData?
                    (listofTickets.map((item, index) => {
                        hasTickets = false

                        handleRender(item)

                        if (item.ownBy == userInfo.userID){
                            hasTickets = true
                            reallyhasTickets = true
                        }
                        return (<>
                                {hasTickets?
                                    <Grid item className={classes.whole}>
                                        {handleRender(item)}
                                        <Grid container direction="row">
                                            <Grid item xs={3}>
                                                <img 
                                                    src={`https://etixbucket.s3.amazonaws.com/etix/${ticketData.vendorInfo[vendorIndex].vendorID}.png`}
                                                    alt={`serviceLogo - ${ticketData.vendorInfo[vendorIndex].vendorName}`}
                                                    style={{margin: 10, height: '90%', width:'90%',}}
                                                />
                                            </Grid>
                                            <Grid item xs={9} container style={{color: 'white', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                                <Grid item xs={12} >
                                                    <Typography style={{fontSize: 30}}>
                                                        {ticketData.vendorInfo[vendorIndex].vendorName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Typography style={{fontSize: 20}}>
                                                        {`${ticketData.locations[fromIndex].locationName} - ${ticketData.locations[toIndex].locationName}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} container>
                                                    <Grid item xs={12} style={{textAlign: 'right'}} >
                                                        Service ID
                                                        <Typography style={{fontSize: 30}} >
                                                            {`${item.service}`}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{textAlign: 'right'}} >
                                                        Ticket ID
                                                        <Typography style={{fontSize: 30}} >
                                                            {`${item.ticketID}`}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid item xs={12}>
                                                        <Grid item xs={8}>
                                                            <Typography style={{fontSize: 20}}>
                                                                {` Departure Date: ${ticketData.route[routeIndex].serviceStartDate}  Departure Time: ${ticketData.route[routeIndex].serviceTime}`}
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
                    ''
                }
                {reallyhasTickets?
                    ''
                :
                    <Grid item><Typography variant="h4">Buy a ticket now!</Typography></Grid>
                }
            </Grid>
            
        </Stack>
    );
}

export default TicketActivities
