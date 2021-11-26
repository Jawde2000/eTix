import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Autocomplete, Paper } from '@mui/material'
import { Stepper, Step, StepLabel, StepContent } from '@mui/material'
import etixLogo from '../globalAssets/eTixLogo.png'
import { et } from 'date-fns/locale';

const steps = [
    {
      label: 'Add route(s) to cart',
      description: `Using the search form above, choose the starting location and the destination. 
                    To view the list of locations available, go to the Attractions page on the Navigation Bar.`,
    },
    {
      label: 'Review itinerary and pay',
      description: `Review the itinerary planned in the cart and perform your payment using our payment partner, PayPal
                    Payment information is not shared with us and strictly processed on PayPal's server.`,
    },
    {
      label: 'Receive ticket and board!',
      description: `Your ticket is promptly credited into your account and available for download or viewing.
                    Display your ticket QR code to the bus attendant and get ready for departure!`,
    },
];

function StepperSec() {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{paddingTop: '100px', paddingBottom: '100px'}} spacing={8}>
            <Grid item xs={4}>
                <Stepper activeStep={activeStep} sx={{width: '100%'}} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        optional={
                            index === 2 ? (
                            <Typography variant="caption">Last step</Typography>
                            ) : null
                        }
                        >
                        {step.label}
                        </StepLabel>
                        <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                            </Button>
                            <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Back
                            </Button>
                            </div>
                        </Box>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3, width: '100%'}}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                    </Paper>
                )}
            </Grid>
            <Grid item xs={4}>
                <Grid container direction="column" justifyContent="center" sx={{background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)', padding: '25px', borderRadius: '25px', color: 'white'}} spacing={2}>
                    <Grid item>
                        <img src={etixLogo} width="150px" alt="eTix logo" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h3">It's that easy!</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">eTix allows you to easily purchase tickets for any occasion, with little to no contact, for your safety and everyone else in the transport industry.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default StepperSec
