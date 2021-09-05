import React from 'react'
import { Link, Container, Grid, Box } from '@material-ui/core'
import PaymentIcon from 'react-payment-icons'

function Footer() {
    return (
        <footer>
            <Box bgcolor="#CFDBD5" px={{xs: 3, sm:10}} py={{xs:5, sm:10}}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Customer Service</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Help Center
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    How to Purchase
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>About eTix</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    About Us
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Privacy Policy
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Follow Us</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Twitter
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Facebook
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
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
                        All Rights Reserved By Pangeema Technology
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer
