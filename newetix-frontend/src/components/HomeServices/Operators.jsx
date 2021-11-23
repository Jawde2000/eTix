import React from 'react'
import { Grid, Container, Box, Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>({
  root: {
    maxWidth: 300,
  },
  operatorsContainer: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
  },
  title: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3), 
  },
  card: {
      maxWidth: "100%",
  },
  media: {
      height: 150,
  }

}));

export const Operators = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.operatorsContainer}>
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
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Business 1
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus reiciendis repudiandae nesciunt? Officiis doloribus cupiditate ex est dolor, recusandae veniam? Officiis velit et suscipit doloribus adipisci vitae unde itaque perspiciatis?
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Details
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        
            
    )
}

export default Operators; 
