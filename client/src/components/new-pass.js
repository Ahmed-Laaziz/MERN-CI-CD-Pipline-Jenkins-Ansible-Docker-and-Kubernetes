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
//const forge = require('node-forge');



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
    
/*const decrypt = (encryptedText, secretKey) => {
  try {
    const decipher = forge.cipher.createDecipher('AES-CBC', forge.util.createBuffer(secretKey));
    decipher.start({ iv: forge.random.getBytesSync(16) });
    decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedText)));
    decipher.finish();
    return decipher.output.data.toString('utf-8');
  } catch (error) {
    console.error('Decryption error:', error);
    // Handle the error appropriately, e.g., throw or return an error message.
    return null;
  }
};*/


const decrypt = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, yourSecretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.error('Decryption error:', error);
    // Handle the error appropriately, e.g., throw or return an error message.
    return null;
  }
};







const handleEmail = async (event) => {
  if (!event || !event.currentTarget) {
    console.error('Event or event.currentTarget is undefined');
    return;
  }
  
  const data = new FormData(event.currentTarget);
  const password = data.get('password');
  const conf_password = data.get('conf-password');

  event.preventDefault();
  const currentUrl = window.location.href;

  // Parse the URL to get the search parameters
  const urlSearchParams = new URLSearchParams(currentUrl);

  // Get the value associated with the "e" parameter and decode it
  const eValue = decodeURIComponent(new URLSearchParams(location.search).get('e')).replace(/\s/g, '+');

  console.log(eValue);

  const decryptedText = decrypt(eValue);

  try {
    const response = await axios.post(backLink+'/prof/email', {"email": decryptedText});
    const prof = response.data
    console.log(prof)

    prof.password = password

    const response2 = await axios.put(backLink+'/prof/update-pass', {"prof": prof});

    navigate(`/`);
    // Handle the response as needed
  } catch (error) {
    // Handle errors
    console.error('Error handling email:', error);
  }

  
  console.log(decryptedText);

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
            type="password"
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
            type="password"
            autoComplete="conf-password"
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