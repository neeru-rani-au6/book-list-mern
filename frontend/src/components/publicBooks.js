import React, { Component } from 'react';
import { Container, Grid, Paper } from "@material-ui/core";
import { publicBook } from '../redux/action/book';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class PublicBooks extends Component {
    async componentDidMount() {
        await this.props.publicBook();
        console.log(this.props)
    }
    render() {
        return (
            <Container>
                <Paper style={{ padding: 20, margin: "30px auto", width: "70%" }}>
                    <h3 style={{ textAlign: 'center' }}>
                        Manage your books, let others to know what's are you into and get to know what's other are into.<br />
                    See other author works.
                </h3>
                </Paper>
                <Grid>
                    {this.props.books.books && this.props.books.books.map((item) => (
                        <Paper key={item._id} style={{ width: "70%", margin: "10px auto", }}>
                            <Grid container >
                                <Grid item >
                                    <img
                                        className="media"
                                        src={item.photoURL}
                                        title="Contemplative Reptile"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Author: {item.author}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Title: {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Genre: {item.genre}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.bookReducer
    }
}

export default connect(mapStateToProps, { publicBook })(PublicBooks);