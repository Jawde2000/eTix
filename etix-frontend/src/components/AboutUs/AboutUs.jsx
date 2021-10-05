import React, { Component, useState } from 'react'
import { makeStyles, Typography, Box, Container, Button, Divider, Link, Grid, Card} from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import tokyoNight from '../globalAssets/tokyoNight.jpg'
import mmu from '../globalAssets/mmu.jpg'
import bus from '../globalAssets/bus.jpg'
import zhipeng from  '../globalAssets/zhipeng.jpeg'
import koee from  '../globalAssets/koee.jpg'


const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: 'url('+ tokyoNight +')',
        backgroundRepeat: "no-repeat",
        height: "100%",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(','),
        paddingBottom: 30,
    },
    slogan: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 50,
        color: '#FFF',
    },
    sloganlg: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 30,
        color: '#FFF',
        padding: 30,
        '&:hover': {
            color: '#F5CB5C',
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: 'none'
        },
    },
    slogans: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 60,
    },
    cnSlogans: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 25,
        color: '#F5CB5C',
        paddingBottom: 15,
    },
    para: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 35,
    },
    para2: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        fontSize: 35,
        color: '#ADD8E6',
    },
    para2Background: {
        backgroundImage: 'url('+ bus +')',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        opacity: 1,
        marginRight: 30,
        marginLeft: 30,
        borderRadius: 50
    },
    mmuBackground: {
        backgroundImage: 'url('+ mmu +')',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        marginTop: 50,
        marginRight: 30,
        marginLeft: 30,
        borderRadius: 50,
    },
    mmuTitle: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        color: '#ADD8E6',
        fontSize: 30,     
        paddingBottom: 70,
    },
    mmuLearnMore : {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        color: '#FFF',
        backgroundColor: 'black',
        fontSize: 14,
        padding: 15,  
        maxHeight: 60, 
        maxWidth: 200,
        borderRadius: 50,    
        '&:hover': {
            backgroundColor: '#fff',
            color: 'black',
        },
    },
    divider: {
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: "bold",
        color: 'black',
    },
    pp1: {
        backgroundImage: 'url('+ zhipeng +')',
    },
    developerTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3), 
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        // Without height undefined it won't work
        height: 350,
        // figure out your image aspect ratio
        aspectRatio: 16 / 9,
    },
    center: {
    },
    developername: {
        fontSize: "0.7em",
        fontWeight: "bold",
        color: '#F5CB5C',
    },
    developerPosition: {
        fontSize: "0.62em",
        fontWeight: "bold",
    }
}));

function AboutUs() {
    const defaultStyle = useStyles();

    const [value, setValue] = useState("One Smooth Ticket for your Ultimate Journey");

    return(
        <div>
        <Box className={defaultStyle.whole}>
            <Box sx={{ padding: 100 }} variant="contained">
            <Typography className={defaultStyle.slogan}>
                Our Slogan In
                <Link className={defaultStyle.sloganlg} onClick={()=>setValue("One Smooth Ticket for your Ultimate Journey")}>English</Link>
                <Link className={defaultStyle.sloganlg} onClick={()=>setValue("一張暢通無阻的車票，開啟您的終極旅程")}>Chinese</Link>
                <Link className={defaultStyle.sloganlg} onClick={()=>setValue("Satu Tiket yang Lancar untuk Perjalanan Utama Anda")}>Malay</Link>
                <Link className={defaultStyle.sloganlg} onClick={()=>setValue("ஒரு மென்மையான பயணம் வேண்டும்")}>Tamil</Link>
            </Typography>
           
            <Typography className={defaultStyle.slogans} >
                {value}
            </Typography>
         
            {/* <Typography className={defaultStyle.cnSlogans}>
            உங்கள் இறுதி பயணத்திற்கு ஒரு மென்மையான சீட்டு
            </Typography>
            <Typography className={defaultStyle.cnSlogans}>
                Satu tiket yang lancar untuk perjalanan utama anda
            </Typography>
            <Typography className={defaultStyle.cnSlogans}>
                一張暢通無阻的車票，開啟您的終極旅程
            </Typography> */}
            </Box>
            <Divider className={defaultStyle.divider} variant="inset"/>
            <Box sx={{ padding: 100 }} variant="contained">
                <Typography className={defaultStyle.para}>
                    eTix is a bus ticket purchasing system developed by Pengeema Technologies made with convenience in mind. Our goal is we will always find a way to 
                    help the people all around the world with innovation.
                </Typography>
            </Box>
            <Box sx={{ padding: 100 }} variant="contained" className={defaultStyle.para2Background}> 
                <Typography className={defaultStyle.para2}>
                    Many problems faces by the transportation industry in this 21st century especially Covid-19 Pandemic in the current global. At eTix, 
                    We are promoting contactless services in order to achieve good hygiene among the people involved in the transportation industry in 
                    the new normal environment.
                </Typography>
            </Box>
            <Box sx={{ padding: 100 }} variant="contained"> 
                <Typography className={defaultStyle.para} color='#CFDBD5'>
                With good faith, eTix is made by Pengeema Technologies to boost tourism post-Covid and to boost economy of Malaysia. 
                The developer team consists of Chew Zhi Peng, Ho Ko Ee and Matthew Labial John.
                </Typography>
            </Box>
            <Container>
            <Typography className={defaultStyle.developerTitle} component="div">
                <Box textAlign ='center' m={1} fontSize="h6.fontSize">
                    Developers 
                </Box>
            </Typography>
            <Grid  container spacing={9} className={defaultStyle.center}
            direction="row"
            alignItems="center"
            justify="center"
            >
            <Grid item xs={12} sm={4} md={3}>
                    <Card className={defaultStyle.card}>
                        <CardActionArea>
                            <CardMedia
                            className={defaultStyle.media}
                            component="img"
                            alt="Example IMG"
                            height="156"
                            width="277"
                            image={koee}
                            title="Ho Ko Ee"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <Box textAlign="center" className={defaultStyle.developername}>
                                Ho Ko Ee
                                </Box>
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <Box textAlign="center" className={defaultStyle.developerPosition}>
                                Developer
                                </Box>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={3} >
                    <Card className={defaultStyle.card}>
                        <CardActionArea>
                            <CardMedia
                            className={defaultStyle.media}
                            component="img"
                            alt="Example IMG"
                            height="156"
                            width="277"
                            image={zhipeng}
                            title="Chew Zhi Peng"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <Box textAlign="center" className={defaultStyle.developername}>
                                Chew Zhi Peng
                                </Box>
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <Box textAlign="center" className={defaultStyle.developerPosition}>
                                Developer Leader
                                </Box>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">                  
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                    <Card className={defaultStyle.card}>
                        <CardActionArea>
                            <CardMedia
                            className={defaultStyle.media}
                            component="img"
                            alt="Example IMG"
                            height="156"
                            width="277"
                            image={koee}
                            title="Matthew Labial John"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                <Box textAlign="center" className={defaultStyle.developername}>
                                Matthew Labial John
                                </Box>
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                <Box textAlign="center" className={defaultStyle.developerPosition}>
                                Developer
                                </Box>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Grid>
            
            </Container>
            <Box sx={{ padding: 100 }} variant="contained" className={defaultStyle.mmuBackground}>
            <Typography className={defaultStyle.mmuTitle}>
               Pengeema Technologies Kuala Lumpur Sdn Bhd
            </Typography>
            <Link className={defaultStyle.mmuLearnMore} href='https://www.mmu.edu.my/' variant="contained" underline={'none'} >
                Learn More
            </Link>
            </Box>
        </Box>
        </div>
    );
}

export default AboutUs;

