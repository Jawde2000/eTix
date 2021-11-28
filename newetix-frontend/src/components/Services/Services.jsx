import React from 'react'
import { Box ,Container, Grid, Typography, Card, CardContent, CardActionArea, CardMedia, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { listService } from '../../state/actions/actions';
import images from '../globalAssets/scripts/bgchange';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import S3 from 'react-aws-s3';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${images()})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        minHeight: 600
    },
    title: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3), 
        fontFamily: ['rubik', 'sans-serif'].join(','),
    },
    card: {
        maxWidth: "100%",
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

function Repeat(classes, services, imgSrc) {

    return services.map((e, i) =>
        <Grid item xs={12} sm={4} lg={3}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    component="img"
                    alt="services img"
                    height="140"
                    image={imgSrc[i]}
                    title="services img"
                    />
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.serviceName}>
                        {services[i].serviceName}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

const findImg = (userID) => {
    const file = userID + '.jpg';

    return "https://etixbucket.s3.amazonaws.com/etix/" + file
}

export const Services = () =>{
    const classes = useStyles();

    let history = useHistory()

    const dispatch = useDispatch();

    const servicesList = useSelector(state => state.servicesList);
    const {success: listServicesSuccess, services, error: listError, loading} = servicesList

    const [allService, setAllService] = useState();

    const [imgSrc, setImgSrc] = useState([]);

    const config = {
        bucketName: 'etixbucket',
        dirName: 'etix', 
        region: 'ap-southeast-1',
        accessKeyId: 'AKIA4TYMPNP6EQNIB7HV',
        secretAccessKey: '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'
    }
    
    const AWS = require('aws-sdk')
    AWS.config.update({
        accessKeyId: "AKIA4TYMPNP6EQNIB7HV",
        secretAccessKey: "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",
        region: "ap-southeast-1",
    });

    const ReactS3Client = new S3(config);
    
    var s3 = new AWS.S3({ apiVersion: '2006-03-01', accessKeyId: 'AKIA4TYMPNP6EQNIB7HV', secretAccessKey: 'Vd8K2yLQrKZermLm4VxV1XJp9k73UPLLwQjfR', region: "ap-southeast-1"});

    useEffect(() => {
        if(services){
            if(services.length === 0){
                dispatch(listService());
            }
        } 

        if(listServicesSuccess){
            setAllService(services)

            let imgs = [];

            services.map((item) => {
                imgs.push(findImg(item.userID));
            })

            setImgSrc(imgs);
        }

    }, [servicesList])

    

    // 

    // const [imgSrc, setImgSrc] = useState(("https://etixbucket.s3.amazonaws.com/etix/" + file));


    return (
        <Container className={classes.root} maxWidth="Fixed">
            {loading?
                (
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress  style={{color: '#F5CB5C'}}/>
                    </Backdrop>
                )
                :
                (
                    <>
                    <Typography className={classes.title} component="div">
                        <Box textAlign ='center' m={1} fontSize="h6.fontSize">
                            Services
                        </Box>
                    </Typography>
                    <Grid container spacing={3}>
                        {Repeat(classes, services, imgSrc)}
                        <Grid item xs={12} container>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <Button variant="contained" href="/">Start Purchasing Ticket!</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    </>
                )
            }
            
        </Container>
    )
}

export default Services;