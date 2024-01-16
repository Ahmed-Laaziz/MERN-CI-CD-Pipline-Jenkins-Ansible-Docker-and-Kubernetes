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
import CryptoJS from 'crypto-js';
import { useLocation } from 'react-router-dom';
//import stream from 'stream-browserify';


const backLink = process.env.REACT_APP_BACK_LINK;
const yourSecretKey = "2e8b32f6d789c1fa68e540f8b2c9825f";


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

export default function NewPass() {

  const { updateProf, hist, updateHist} = useProf();
  const location = useLocation();

  const navigate = useNavigate();
  const { setToken } = useToken();
  const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const decrypt = (encryptedText) => {
    try {
      console.log("Encrypted Text:", encryptedText);
  
      const bytes = CryptoJS.AES.decrypt(encryptedText, yourSecretKey);
      console.log("Decrypted Bytes:", bytes);
  
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted Text:", decrypted);
  
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error.message);
      return null;
    }
  };


const handleEmail = async (event) => {

    event.preventDefault();
    const currentUrl = window.location.href;

    // Parse the URL to get the search parameters
    const urlSearchParams = new URLSearchParams(currentUrl);

    // Get the value associated with the "e" parameter
    const eValue = new URLSearchParams(location.search).get('e');
    //console.log("encrypted text : "+eValue)
    //console.log(currentUrl)
    //console.log(urlSearchParams)
    const decryptedText = decrypt(eValue);

    console.log(decryptedText)
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
              Nouveau Mot de passe
            </Typography>
            <Box component="form" onSubmit={handleEmail} noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Mot de passe"
            name="password"
            autoComplete="password"
            autoFocus
            />
            <span style={{ color: 'red' , fontSize: '70%'}}>{emailError}</span>
            <TextField
            margin="normal"
            required
            fullWidth
            id="conf-password"
            label="Confirmer mot de passe"
            name="conf-password"
            autoComplete="conf-password"
            autoFocus
            />

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