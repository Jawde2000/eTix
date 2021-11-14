import React, { useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { Grid, Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import etixLogo from '../globalAssets/eTixLogo.png'
import QRCode from "react-qr-code";
import Pdf from "react-to-pdf"
import images from '../globalAssets/scripts/bgchange';

const ref = React.createRef();

const useStyles = makeStyles((theme) => ({
    whole: {
        background: 'linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))',
        color: 'white',
        padding: '5px',
        width: '750px',
        paddingBottom: '15px'

    },
    logo: {
        marginTop: '15px',
        marginBottom: '15px',
    },
    tf: {
        width: '550px'
    },
    bgg: {
        backgroundImage: `url(${images()})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(',')
    }
}));

export const Ticket = ({props}) => {
    const classes = useStyles();
    const { id } = useParams();

    const [serviceName, setServiceName] = useState("Teyvat Express");
    const [fromLocation, setFromLocation] = useState("Mondstadt");
    const [toLocation, setToLocation] = useState("Inazuma");
    const [vendorName, setvendorName] = useState("The Crux");
    const [fName, setfName] = useState("Traveler");
    const [lName, setlName] = useState("Lumine");
    const [date, setDate] = useState("2021-11-15");
    const [time, setTime] = useState("0600");
    const [token, setToken] = useState("omg");


    return (
        <Grid container direction="column" alignItems="center" className={classes.bgg} sx={{paddingTop: '15px'}}>
            <Grid item>
                <Typography variant="h2">Ticket</Typography>
            </Grid>
            <Grid item>
                <Box ref={ref} className={classes.whole}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Grid container direction="row" alignItems="center" className={classes.logo}>
                                <Grid item>
                                    <img src={etixLogo} width='100px' />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3">eTix</Typography>
                                </Grid>
                                <Grid item>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</Grid>
                                <Grid item>
                                    <Typography variant="p" sx={{padding: '7.5%', backgroundColor: 'white', color: 'red', fontWeight: 'bold', borderRadius: '15px'}}>{id}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={4}>
                                <Grid item>
                                    <QRCode value={`id=${id}&token=${token}`} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3">{serviceName}</Typography>     
                                    <Typography variant="h5">{fromLocation} - {toLocation}</Typography>     
                                    <Typography variant="h5">{vendorName}<br /><br /><br /></Typography>     
                                    <Typography variant="h6">{fName} {lName}</Typography>     
                                    <Typography variant="h6">{date} / {time}</Typography>     
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item sx={{paddingTop: '15px', paddingBottom: '15px'}}>
                <Pdf targetRef={ref} options={{orientation: 'landscape', unit: 'in', format: [7.75,3.75]}} filename="ticket.pdf">
                    {({ toPdf }) => <Button variant="contained" onClick={toPdf}>Download PDF</Button>}
                </Pdf>
            </Grid>
        </Grid>
    )
};

export default Ticket;