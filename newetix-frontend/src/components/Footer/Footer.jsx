import React from 'react'
import { Link, Container, Grid, Box } from '@mui/material'

import PaymentIcon from '@mui/icons-material/Payment';

function Footer() {
    return (
        <footer>
            <Box px={{xs: 3, sm:7}} py={{xs:5, sm:7}} style={{background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)', fontFamily: ['rubik', 'sans-serif'].join(','), color: 'white'}}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} >Customer Service</Box>
                            <Box style={{paddingTop: 10, paddingBottom: 5}}>
                                <Link href="/helpcentre" color="inherit" underline={'none'}>
                                    Help Center
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline={'none'}>
                                    How to Purchase
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>About eTix</Box>
                            <Box style={{paddingTop: 10, paddingBottom: 5}}>
                                <Link href="/aboutUs" color="inherit" underline={'none'}>
                                    About Us
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/privacyPolicy" color="inherit" underline={'none'}>
                                    Privacy Policy
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Follow Us</Box>
                            <Box style={{paddingTop: 10, paddingBottom: 5}}>
                                <Link href="/" color="inherit" underline={'none'}>
                                    Twitter
                                </Link>
                            </Box>
                            <Box style={{paddingBottom: 5}}>
                                <Link href="/" color="inherit" underline={'none'}>
                                    Facebook
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline={'none'}>
                                    Instagram
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Payment</Box>
                            <Box>
                                <img src="https://www.milkshakedesign.com/wp-content/uploads/2018/12/paypal-logo-payment.png" width='250px' alt="Paypal" />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{xs: 5, sm:10}}>
                        eTix &reg;{new Date().getFullYear()} 
                    </Box>
                    <Box textAlign="center" pb={{xs:5, sm:0}}>
                        All Rights Reserved By Pengeema Technologies
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer
