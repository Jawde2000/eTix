import React from 'react'
import { Grid, Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                                Business 2
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
                                Business 3
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
                                Business 4
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
