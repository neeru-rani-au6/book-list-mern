import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { allBook, deleteBook, createBook, updateBook } from '../redux/action/book';
import { connect } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Home extends Component {
    state = {
        open: false,
        bookList: null,
        title: "",
        author: "",
        photoURL: "",
        genre: "",
        id: null,
        showBackdrop: true,
        public: false
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            title: "",
            author: "",
            photoURL: "",
            genre: "",
            id: null
        });
    };
    handleChange = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value
        });
    };
    handleSubmit = async (e) => {
        this.setState({
            showBackdrop: true,
        })
        if (this.state.id) {
            // update your book
            await this.props.updateBook(this.state);
        } else {
            await this.props.createBook(this.state);
        }
        console.log(this.props.book.books);
        this.setState({
            open: false,
            bookList: this.props.book.books,
            title: "",
            author: "",
            photoURL: "",
            genre: "",
            id: null,
            showBackdrop: false
        });
    }


    async componentDidMount() {
        await this.props.allBook();
        this.setState({
            bookList: this.props.book.books,
            showBackdrop: false
        });
        if (!this.props.user.isAuthenticated) {
            this.props.history.push("/#/login")
        }
    }
    async bookDelete(id) {
        this.setState({
            showBackdrop: true
        })
        await this.props.deleteBook(id);
        this.setState({
            bookList: this.props.book.books,
            showBackdrop: false
        })
    }
    handleEditBookDetailsClickOpen(book) {
        this.setState({
            open: true,
            title: book.title,
            author: book.author,
            photoURL: book.photoURL || "",
            genre: book.genre,
            id: book._id,
            public: book.public
        });
    }
    handleChangeCheck = (event) => {

        this.setState({ ...this.state, public: event.target.checked });
    }
    render() {
        return (
            <>
                <Container>
                    <Grid container justify="flex-end">
                        <Grid item >
                            {this.state.bookList && this.state.bookList.length !== 0 &&
                                <Button size="large" color="primary" variant="contained" onClick={this.handleClickOpen} >
                                    Add New Book
                </Button>
                            }
                        </Grid>
                    </Grid>
                    <Grid container>
                        {this.state.bookList && this.state.bookList.map((item) => (
                            <Grid item key={item._id}>
                                <Card className="card-root">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="160"
                                            image={item.photoURL || "https://assets.entrepreneur.com/content/3x2/2000/20190311153646-GettyImages-932272022.jpeg"}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent style={{ minHeight: 140 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Auhtor: {item.author}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Title: {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Genre: {item.genre}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Grid container justify="space-between">
                                            <Grid item>
                                                <Button size="small" color="primary" onClick={() => this.handleEditBookDetailsClickOpen(item)}>
                                                    Edit
        </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button size="small" color="secondary" onClick={() => this.bookDelete(item._id)}>
                                                    Delete
        </Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        {this.state.bookList && this.state.bookList.length === 0 &&
                            <Paper className="noBookData">
                                <Grid container justify="center" alignItems="center">
                                    <Grid item style={{ textAlign: "center", padding: "10px" }}>
                                        <p>
                                            It looks like you don't have any book.
                                        </p>
                                        <Button size="large" className="createBookData" color="primary" variant="contained" onClick={this.handleClickOpen} >
                                            Add New Book
                </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        }
                    </Grid>
                </Container>
                <div>
                    <Dialog disableBackdropClick
                        disableEscapeKeyDown open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{this.state.id ? "Update Book Details" : "Add New Book"}</DialogTitle>
                        <DialogContent dividers>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="photoURL"
                                label="photoURL"
                                type="photoURL"
                                fullWidth
                                value={this.state.photoURL}
                                onChange={(e) => this.handleChange("photoURL", e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="title"
                                label="Title"
                                type="Title"
                                fullWidth
                                value={this.state.title}
                                onChange={(e) => this.handleChange("title", e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="author"
                                label="Author"
                                type="Author"
                                fullWidth
                                value={this.state.author}
                                onChange={(e) => this.handleChange("author", e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="genre"
                                label="Genre"
                                type="Genre"
                                fullWidth
                                value={this.state.genre}
                                onChange={(e) => this.handleChange("genre", e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.public} color="primary" onChange={this.handleChangeCheck} name="public" />}
                                label="Public"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
          </Button>
                            <Button onClick={this.handleSubmit} color="primary" variant="contained">
                                Submit
          </Button>
                        </DialogActions>
                    </Dialog>
                    <Backdrop className="backdrop" open={this.state.showBackdrop} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        book: state.bookReducer,
        user: state.userReducer
    }

}
export default connect(mapStateToProps, { allBook, deleteBook, createBook, updateBook })(withRouter(Home));