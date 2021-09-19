import React from 'react'
import { Link, Container, Grid, Box } from '@material-ui/core'
import PaymentIcon from 'react-payment-icons'

function Footer() {
    return (
        <footer>
            <Box bgcolor="#CFDBD5" px={{xs: 3, sm:7}} py={{xs:5, sm:7}}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} >Customer Service</Box>
                            <Box style={{paddingTop: 10, paddingBottom: 5}}>
                                <Link href="/" color="inherit" underline={'none'}>
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
                                <Link href="/" color="inherit" underline={'none'}>
                                    About Us
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" underline={'none'}>
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
                                <PaymentIcon
                                    id="visa"
                                    style= {{margin:10, width:50}}
                                    className= "payment-icon"
                                />
                                <PaymentIcon
                                    id="mastercard"
                                    style= {{margin:10, width:50}}
                                    className= "payment-icon"
                                />
                                <PaymentIcon
                                    id="paypal"
                                    style= {{margin:10, width:50}}
                                    className= "payment-icon"
                                />
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
