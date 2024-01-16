import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
const backLink = process.env.REACT_APP_BACK_LINK
const steps = ['données personnelles', 'données professionnelles', 'données supplémentaires'];
const genreOptions = ['Homme', 'Femme']
const fonctionOptions = ['Ingénieur', 'Technicien']

export default function ColumnPinningDynamicRowHeight({prof}) {
  const navigate = useNavigate();
  
     //name 
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [addedEmployee, setAddedEmployee] = React.useState(false);
  const [firstNameHelperText, setFirstNameHelperText] = React.useState('');
  const [lastNameHelperText, setLastNameHelperText] = React.useState('');

  const handleChangeFirstName = (e) => {
    const newValue = e.target.value;
    setFirstName(newValue);

    // Validate the first name
    if (!validateName(newValue)) {
      setFirstNameError(true);
      setFirstNameHelperText('Invalid first name format. Please enter a valid first name.');
    } else {
      setFirstNameError(false);
      setFirstNameHelperText('');
    }
  };

  const handleChangeLastName = (e) => {
    const newValue = e.target.value;
    setLastName(newValue);

    // Validate the last name
    if (!validateName(newValue)) {
      setLastNameError(true);
      setLastNameHelperText('Invalid last name format. Please enter a valid last name.');
    } else {
      setLastNameError(false);
      setLastNameHelperText('');
    }
  };

  const validateName = (name) => {
    // A simple regex pattern to validate names (alphabetic characters only)
    const nameRegex = /^[A-Za-z\s]*$/;
    return nameRegex.test(name);
  };



   //Arabic names
   const [fnArinputValue, setFnArInputValue] = useState('');
   const [lnArinputValue, setLnArInputValue] = useState('');
   const [isValidArabicFName, setIsValidArabicFName] = useState(true);
   const [isValidArabicLName, setIsValidArabicLName] = useState(true);
   const handleFnArChange = (event) => {
     const newValue = event.target.value;
 
     // Regular expression to match Arabic letters
     const arabicLettersRegex = /^[\u0621-\u064A\s]+$/;
 
     // Check if the input value contains only Arabic letters or is empty
     if (newValue === '' || arabicLettersRegex.test(newValue)) {
       setFnArInputValue(newValue);
       setIsValidArabicFName(true);
     } else {
       setIsValidArabicFName(false);
     }
   }; 
   const handleLnArChange = (event) => {
     const newValue = event.target.value;
 
     // Regular expression to match Arabic letters
     const arabicLettersRegex = /^[\u0621-\u064A\s]+$/;
 
     // Check if the input value contains only Arabic letters or is empty
     if (newValue === '' || arabicLettersRegex.test(newValue)) {
       setLnArInputValue(newValue);
       setIsValidArabicLName(true);
     } else {
       setIsValidArabicLName(false);
     }
   }; 



    //Cadre
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedFonction, setSelectedFonction] = useState(null);
  

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };
  const handleFonctionChange = (event, newValue) => {
    setSelectedFonction(newValue);
  };
  // const handleDepartementChange = (event, newValue) => {
  //   setSelectedDepartement(newValue);
  // };


  //CIN
  const [cin, setCin] = React.useState('');
  const [cinError, setCinError] = React.useState(false);
  const [cinHelperText, setCinHelperText] = React.useState('');

  const handleCINChange = (e) => {
    const newValue = e.target.value;
    setCin(newValue);
    console.log(newValue === "");

    // Validate the CIN format
    if (newValue === ""){
      setCinError(false);
      setCinHelperText('');
    }
    else if (!validateCin(newValue)) {
      setCinError(true);
      setCinHelperText('Invalid CIN format. Please enter a valid CIN (e.g., AB123456).');
    }
     
     else {
      setCinError(false);
      setCinHelperText('');
    }
  };

  const validateCin = (cin) => {
    // A simple regex pattern to validate CIN format: two capital letters followed by six numbers
    const cinRegex = /^[A-Z]{2}\d{6}$/;
    return cinRegex.test(cin);
  };


  //Email
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState('');

  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);

    // Validate the email address
    if (newValue === ""){
      setEmailError(false);
      setEmailHelperText('');
    }
    else if (!validateEmail(newValue)) {
      setEmailError(true);
      setEmailHelperText('Invalid email address. Please enter a valid email.');
    } else {
      setEmailError(false);
      setEmailHelperText('');
    }
  };
  const validateEmail = (email) => {
    // A simple regex pattern to validate email addresses
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };


  //Phone number
const [phoneNumber, setPhoneNumber] = React.useState('');
const [phoneNumberError, setPhoneNumberError] = React.useState(false);
const [phoneNumberHelperText, setPhoneNumberHelperText] = React.useState('');

const handleChange = (e) => {
  const newValue = e.target.value;
  setPhoneNumber(newValue);

  // Validate the phone number
  if (newValue === ""){
    setPhoneNumberError(false);
    setPhoneNumberHelperText('');
  }
  else if (!validatePhoneNumber(newValue)) {
    setPhoneNumberError(true);
    setPhoneNumberHelperText('Invalid phone number. It must be 9 numeric characters.');
  } else {
    setPhoneNumberError(false);
    setPhoneNumberHelperText('');
  }
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{9}$/;
  return phoneRegex.test(phoneNumber);
};



const addFonctionnaire = async () => {
  try {
    // Show the spinner while the backend request is in progress
    // setIsLoading(true);
    const url = backLink+"/prof/add-professeur"; // URL for the backend API
    const requestData = {
      nom: lastName+"|"+lnArinputValue, // Send the user input as a parameter in the request body
      prenom: firstName+"|"+fnArinputValue,
      email: email,
      tel: phoneNumber,
      cin: cin,
      genre: selectedGenre,
      cadre: selectedFonction
    };
    console.log("collected fonctionnaire infos : " + requestData.nom)
    // Make a POST request to your backend API
    const response = await axios.post(url, requestData);
    navigate(`/all-fonctionnaires`);
    
  } catch (error) {
    console.error("Error fetching fonctionnaire data:", error);
  } finally {
    // Hide the spinner after the backend request is completed
    // setIsLoading(false);
  }
};

//   const [showEditDelete, setShowEditDelete] = React.useState(true);''

  return (
    <Box sx={{ width: '100%' }}>
    <Grid container spacing={2} style={{marginTop:"2%"}}>
            <Grid item xs={3} >
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  &nbsp;&nbsp;Prénom 
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  value={firstName}
                  onChange={handleChangeFirstName}
                  error={firstNameError}
                  helperText={firstNameHelperText}
          />
              </div>
            </Grid>
            <Grid item xs={3} >
              <div>
                <Typography variant="subtitle1" gutterBottom>
                &nbsp;&nbsp;الإسم
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  value={fnArinputValue}
                  onChange={handleFnArChange}
                  error={!isValidArabicFName}
                  helperText={!isValidArabicFName ? 'يرجى إدخال حروف عربية فقط' : ''}
          />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                &nbsp;&nbsp;Nom 
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  value={lastName}
                  onChange={handleChangeLastName}
                  error={lastNameError}
                  helperText={lastNameHelperText}
          />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                &nbsp;&nbsp;النسب
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  value={lnArinputValue}
                  onChange={handleLnArChange}
                  error={!isValidArabicLName}
                  helperText={!isValidArabicLName ? 'يرجى إدخال حروف عربية فقط' : ''}
          />
              </div>
            </Grid>
            <Grid item xs={2} >
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Genre (الجنس)
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                  options={genreOptions}
                  value={selectedGenre}
                  onChange={handleGenreChange}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            
            <Grid item xs={2}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  CIN (رقم ب.ت.وطنية)
                </Typography>
                <TextField
                //   label="French Label 3"
                  variant="outlined"
                  fullWidth
                  required
                  value={cin}
                  onChange={handleCINChange}
                  error={cinError}
                  helperText={cinHelperText}
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={2} >
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Fonction (وظيفة)
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                
                  options={fonctionOptions}
                  value={selectedFonction}
                  onChange={handleFonctionChange}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Email (البريد الإلكتروني)
                </Typography>
                <TextField
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailHelperText}
        />
              </div>
            </Grid>
            <Grid item xs={3}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Numéro de téléphone (رقم الهاتف)
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          required
          value={phoneNumber}
          onChange={handleChange}
          error={phoneNumberError}
          helperText={phoneNumberHelperText}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+212</InputAdornment>
            ),
          }}
        />
      </div>
    </Grid>
            
          </Grid>
          <Grid>
            &nbsp;
          </Grid>
          <Button variant='contained' onClick={addFonctionnaire}>Ajouter</Button>
          </Box>
  );
}

