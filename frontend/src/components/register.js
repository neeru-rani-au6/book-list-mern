import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/action/user';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {
    const classes = useStyles();
    const user = useSelector(state => state.userReducer);
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        isSubmitting: false,
        nameError: "",
        emailError: "",
        passwordError: ""
    });
    const handleChange = (key, value) => {
        const newState = { ...state };
        newState[key] = value;
        if (key === 'name') {
            newState.nameError = "";
            if (!newState.name.match(/^[a-z ,.'-]{3,150}$/i)) {
                newState.nameError = "name is not valid"
            }
            if (newState.name.trim() === "") {
                newState.nameError = "First name is required"
            }
        }
        if (key === 'email') {
            newState.emailError = "";
            if (!newState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                newState.emailError = "invalid email "
            }
            if (newState.email.trim() === "") {
                newState.emailError = "email is required"
            }
        }
        if (key === "password") {
            newState.passwordError = "";
            if (newState.password.length < 5) {
                newState.passwordError = "Can not be less than 5"
            }
            if (newState.password.trim() === "") {
                newState.passwordError = "password is required"
            }
        }
        setState(newState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newState = { ...state };
        if (newState.name.trim() === "" || newState.nameError) {
            newState.nameError = newState.nameError || "first name is required"
            setState(newState)
            return
        }
        if (newState.email.trim() === "" || newState.emailError) {
            newState.emailError = newState.emailError || "email is required"
            setState(newState);
            return
        }
        if (newState.password.trim() === "" || newState.passwordError) {
            newState.passwordError = newState.passwordError || "password is required"
            setState(newState);
            return
        }
        setState({ ...state, isSubmitting: true });
        await dispatch(registerUser(state));
        setState({ ...state, isSubmitting: true });
        if (!user.error) {
            history.push("/#/login")
        } else {
            setState({ ...state, isSubmitting: false });
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="name "
                        name="name"
                        autoComplete="name"
                        value={state.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        autoFocus
                        error={!!state.nameError}
                        helperText={state.nameError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={state.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        autoComplete="email"
                        error={!!state.emailError}
                        helperText={state.emailError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={state.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        autoComplete="current-password"
                        error={!!state.passwordError}
                        helperText={state.passwordError}
                    />
                    {user.error &&
                        <Grid item xs={12} className="error">
                            <div className="error">{user.error}</div>
                        </Grid>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={state.isSubmitting}
                    >
                        Submit
          </Button>
                    <Grid container justify="center">
                        <Grid item>
                            Already have an account? &nbsp;
                            <Link href="/#/login" variant="body2">
                                Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
