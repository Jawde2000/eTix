import { AppBar, Grid, Box, makeStyles, Container} from '@mui/material';

function Footer() {
    return (
        <footer>
            <Box bgcolor="#CFDBD5" px={{xs: 3, sm:7}} py={{xs:5, sm:7}}>
                <Container maxWidth="lg">
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
