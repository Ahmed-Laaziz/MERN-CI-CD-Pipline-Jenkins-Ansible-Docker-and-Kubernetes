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

export default function RetreiveSide() {

  const { updateProf, hist, updateHist} = useProf();


  const navigate = useNavigate();
  const { setToken } = useToken();
  const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');



const handleEmail = async (event) => {

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    event.preventDefault(); // Prevents the default form submission behavior
    
    try {
      const response = await axios.post(backLink+'/agent/send', {"email": email});
      setEmailError('Un courrier a été envoyé à votre adresse e-mail.')
      // Handle the response as needed
    } catch (error) {
      // Handle errors
      console.error('Error handling email:', error);
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container justifyContent="center" alignItems="center" component="main" sx={{ height: '100vh', backgroundImage: `url(${EnsaImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center', }}>
        <CssBaseline />

        <Grid item component={Paper} elevation={6} square>
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
              Recuperation
            </Typography>
            <Box component="form" noValidate onSubmit={handleEmail} sx={{ mt: 1 }}>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Envoyer mail
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}