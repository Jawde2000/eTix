import { Box, Container} from '@mui/material';
import { makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        background: "linear-gradient(to right top, #eeeeb0, #e6eca0, #dcea91, #d0e882, #c3e674)",
    }
}));



function Footer() {
    const classes = useStyles();
    return (
        <footer>
            <Box className={classes.footer} px={{xs: 3, sm:7}} py={{xs:5, sm:7}}>
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
