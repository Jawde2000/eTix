import {  Grid, Box,  Link, Typography, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useHistory} from 'react-router-dom';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveLookup, routeLookup } from '../../state/actions/actions';

const useStyles = makeStyles((theme) => ({
    filter: {
        backgroundColor: 'rgba(247, 213, 124, 0.9)',
        borderRadius: '25px',
        paddingLeft: '25px',
        paddingRight: '25px'
    },
    queryblk: {
        paddingLeft: '25px',
        paddingRight: '25px'
    },
    query: {
        backgroundColor: 'rgba(247, 213, 124, 0.9)',
        borderRadius: '25px',
        padding: '25%'
    }
}));

export default function Query() {
    const defaultStyle = useStyles();
    let history = useHistory()
    const lookupDetails = useSelector(state => state.storeLookup)
    const dispatch = useDispatch()
    dispatch(routeLookup(lookupDetails.locationFrom,lookupDetails.locationTo))

    return (
        <Box>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start" columnSpacing={{sm: 4}}>
                <Grid item className={defaultStyle.filter}>
                    xs=4
                </Grid>
                <Grid item className={defaultStyle.queryblk}>
                    <Grid container direction="column" justifyContent="space-evenly" alignItems="flex-start">
                        <Grid item className={defaultStyle.query}>xs=8</Grid>
                        <Grid item className={defaultStyle.query}>xs=8</Grid>
                        <Grid item className={defaultStyle.query}>xs=8</Grid>
                        <Grid item className={defaultStyle.query}>xs=8</Grid>
                        <Grid item className={defaultStyle.query}>xs=8</Grid>
                        <Grid item className={defaultStyle.query}>xs=8</Grid>
                        <Grid item className={defaultStyle.query}>xs=8</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}