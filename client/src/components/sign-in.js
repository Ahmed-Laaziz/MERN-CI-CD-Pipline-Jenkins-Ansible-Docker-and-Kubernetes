import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EnsaImg from '../images/ensaj2.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/TokenContext';
import { useProf } from '../context/ProfContext';


const backLink = process.env.REACT_APP_BACK_LINK;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Ensaj
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


const defaultTheme = createTheme();

export default function SignInSide() {

  const { updateProf, hist, updateHist} = useProf();


  const navigate = useNavigate();
  const { setToken } = useToken();
  const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    

    console.log(backLink)

    // Reset previous error messages
  setEmailError('');
  setPasswordError('');

  if (!email) {
    // Display an error message if email or password is empty
    setEmailError('Email requis');
    // return;
  }
  if (!password) {
    // Display an error message if email or password is empty
    setPasswordError('Mot de passe requis');
    // return;
  }
  
    try {
      console.log('in try')
      // Send a POST request to the /login endpoint with user credentials
      // const response = await axios.post('https://grh-ensaj-backend.adaptable.app/auth/login', { email, password });
      const response = await axios.post(backLink+'/auth/login', { email, password });
      // If authentication is successful, you will receive a JWT token in the response
      const token = response.data.token;

      updateProf(response.data.user);
      localStorage.setItem('user', response.data.user)
      localStorage.setItem('type', response.data.user.__t)

      if(response.data.user.__t === "Professeur"){

      const hists = await axios.post(
        backLink+`/hist/prof-hist`, {"prof": response.data.user._id} // Replace with your actual API endpoint
      );
      
      updateHist(hists.data);

      console.log("the historiques are : ")
      console.log(hist)
    }

      
      console.log("the profession is : ")
      console.log(response.data.user.__t)

      // You can store the token in a cookie or local storage for future authenticated requests
      // For this example, we'll just log the token
      console.log('JWT Token:', token);
      setToken(token);
      // Save the token in localStorage
    localStorage.setItem('token', token);
      navigate(`/home`);
      // Redirect the user or perform any necessary actions upon successful login
    } catch (error) {
      if (error.response.status === 401 && password !== ''){
        setPasswordError('Mot de passe incorrect');
      }
      else if (error.response.status === 404 && email !== ''){
        setEmailError('Email incorrect');
      }
      // Handle authentication errors
      if (error.response) {
        console.error('Authentication failed:', error.response.data.error);
      } else {
        console.error('An error occurred during authentication:', error.message);
      }
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${EnsaImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Gestion des Ressources Humaines
            </Typography>
            <Grid>&nbsp;</Grid>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Authentification
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
  margin="normal"
  required
  fullWidth
  id="email"
  label="Email"
  name="email"
  autoComplete="email"
  autoFocus
/>
<span style={{ color: 'red' , fontSize: '70%'}}>{emailError}</span>

<TextField
  margin="normal"
  required
  fullWidth
  name="password"
  label="Mot de passe"
  type="password"
  id="password"
  autoComplete="current-password"
/>
<span style={{ color: 'red' , fontSize: '70%'}}>{passwordError}</span>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="se souvenir de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Authentification
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Mot de passe oublié?
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}