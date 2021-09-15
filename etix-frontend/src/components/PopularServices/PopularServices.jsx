import React from 'react'
import { Box ,Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import bgImg from '../cities/tokyo.jpg'
import '../HomeQuery/fonts.css'
;

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        minHeight: 500
    },
    title: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3), 
        fontFamily: ['rubik', 'sans-serif'].join(','),
    },
    card: {
        maxWidth: "80%",
    },
    media: {
        height: 200,
    },
    serviceName: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        textAlign: 'center',
        color: '#F5CB5C'
    },
    cardContent: {
        backgroundColor: 'rgb(36,36,35)'
    },
}));

export const PopularServices = () =>{
    const classes = useStyles();

    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Typography className={classes.title} component="div">
                <Box textAlign ='center' m={1} fontSize="h6.fontSize">
                Popular Operators
                </Box>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Example IMG"
                            height="140"
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                            title="Example IMG"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                                Business 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
