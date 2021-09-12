import React, {useState, useEffect} from 'react'
import { Box ,Container, TextField, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bgImg from '../cities/moscow.jpg'
import '../HomeQuery/fonts.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
    },
    title: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
    },
    lastBox: {
        paddingBottom: theme.spacing(4)
    },
    otp:{
        fontFamily: ['rubik', 'sans-serif'].join(','),
        backgroundColor: 'black',
    },
    otpContainer: {
        paddingBottom: theme.spacing(4)
    }
}));



export const Verification = () => {
    const [Vcode, setVcode] = useState(new Array(5).fill(""));
    const classes = useStyles();

    const handleChange = (index,e) => {
        setVcode([...Vcode.map((d,idx)=>(idx===index)? e.target.value:d)]);
    } 

    
    return (
        <Container maxWidth="fixed" className={classes.root}>
           <Typography className={classes.title} component="div">
                <Box textAlign ='center' m={1} fontSize="h2.fontSize">
                    Enter Verification Code
                </Box>
                <Box textAlign ='center' m={1} fontSize="h4.fontSize">
                    Your verification code is sent to
                </Box>
                <Box textAlign ='center' m={1} fontSize="h3.fontSize" className={classes.lastBox}>
                    arosy@gmail.com
                </Box>
                
               

                <Grid container spacing={5} justifyContent="center" className={classes.otpContainer}>
                        <Grid item  xs={5} sm={1} >
                            <TextField
                                className={classes.otp}
                                inputProps={{min: 0, style: { textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), color: 'white'}, maxLength: 1}}
                                variant="outlined"
                                textAlign="center"
                                value={Vcode[0]}
                                onChange={(e) => handleChange(0,e)}
                            />
                        </Grid>
                        <Grid item xs={5} sm={1} >
                            <TextField
                                className={classes.otp}
                                inputProps={{min: 0, style: { textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), color: 'white'}, maxLength: 1}}
                                variant="outlined"
                                textAlign="center"
                                value={Vcode[1]}
                                onChange={(e) => handleChange(1,e)}
                            />
                        </Grid>
                        <Grid item xs={5} sm={1} >
                            <TextField
                                className={classes.otp}
                                inputProps={{min: 0, style: { textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), color: 'white'}, maxLength: 1}}
                                variant="outlined"
                                textAlign="center"
                                value={Vcode[2]}
                                onChange={(e) => handleChange(2,e)}
                            />
                        </Grid>
                        <Grid item xs={5} sm={1} >
                            <TextField
                                className={classes.otp}
                                inputProps={{min: 0, style: { textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), color: 'white'}, maxLength: 1}}
                                variant="outlined"
                                textAlign="center"
                                value={Vcode[3]}
                                onChange={(e) => handleChange(3,e)}
                            />
                        </Grid>
                        <Grid item xs={5} sm={1} >
                            <TextField
                                className={classes.otp}
                                inputProps={{min: 0, style: { textAlign: 'center', fontFamily: ['rubik', 'sans-serif'].join(','), color: 'white' }, maxLength: 1}}
                                variant="outlined"
                                textAlign="center"
                                value={Vcode[4]}
                                onChange={(e) => handleChange(4,e)}
                            />
                        </Grid>
                </Grid>
                <Box textAlign="center" >
                    <Button 
                        variant="contained" 
                        onClick={(e) => console.log(Vcode.join(''))}
                        startIcon={<NavigateNextIcon/>}
                        style={{backgroundColor: '#F5CB5C', fontFamily: ['rubik', 'sans-serif'].join(',')}}
                        
                    >Verify</Button>
                </Box>
                
            </Typography>
        </Container>
            
    )
}

export default Verification

