import React from 'react'
import { Link, Container, Grid, Box } from '@mui/material'

function Footer() {
    return (
        <footer>
            <Box px={{xs: 3, sm:7}} py={{xs:5, sm:7}} style={{background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)', fontFamily: ['rubik', 'sans-serif'].join(','), color: 'white'}}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} >Customer Service</Box>
                            <Box style={{paddingTop: 10, paddingBottom: 5}}>
                                <Link href="/help" color="inherit" underline={'none'}>
                                    Help Center
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/help/articles" color="inherit" underline={'none'}>
                                    Articles
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>eTix</Box>
                            <Box style={{paddingTop: 10, paddingBottom: 5}}>
                                <Link href="/about" color="inherit" underline={'none'}>
                                    About Us
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/privacy" color="inherit" underline={'none'}>
                                    Privacy Policy
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Payment</Box>
                            <Box>
                                <Link href="https://www.paypal.com/us/digital-wallet/how-paypal-works"><img style={{marginTop: '5px'}} src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Full_Online_Tray_RGB.png" width='250px' alt="Paypal" /></Link>
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
