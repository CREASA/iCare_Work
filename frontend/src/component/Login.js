import React, { useState, useEffect } from 'react'; //import React Component
import { useNavigate, NavLink, Navigate } from 'react-router-dom'
import validator from 'validator';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';


const theme = createTheme();
const client = axios.create({
    // baseURL: "http://127.0.0.1:8000"
    baseURL: "http://localhost:8000"
});

// login form
export function Login(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        client.post(
            "/login",
            {
                username: data.get('username'),
                password: data.get('password')
            }
        ).then(function (res) {
            setCurrentUser(true);
            // TODO: navigate to chosen bot
            console.log("logged in");
        }).catch(error => console.log("unable to log in user: ",
            // username: data.get('username'),
            // password: data.get('password'),
            error.response.data

        ));

    };

    const [currentUser, setCurrentUser] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <ThemeProvider theme={theme}>
            <Container id="loginCard" component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* TODO: reserved space for future avatar implementation */}
                    {/* <Avatar sx={{ m: 6, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon sx={{ m: 6 }} />
                    </Avatar> */}
                    <h1>Welcome back!</h1>
                    <Typography>
                        Don't have an account? <NavLink to="../register" className="card-link ">Sign up</NavLink>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            // fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <p>or</p>
                        <NavLink to="/botchoice" className="card-link ">Continue as guest</NavLink>
                        {/* TODO: reserved space for future implementation of finding password */}
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
