import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backLink = process.env.REACT_APP_BACK_LINK
const steps = ['données personnelles', 'données professionnelles', 'données supplémentaires'];
const genreOptions = ['Homme', 'Femme']
const serviceOptions = ['Rh', 'Scolarité', 'Informatique']
const fonctionOptions = ['Ingénieur', 'Technicien']
const cadreOptions = ["Ingénieur", 'Technicien', 'Administrateur', 'Adjoint technique'];

const cadreGradeMapping = {
  "Ingénieur": ['Grade Principal', 'Premier Grade'],
  'Technicien': ['1er Grade', '2éme Grade', '3éme Grade', '4éme Grade'],
  'Administrateur': ['1er Grade', '2éme Grade', '3éme Grade','1er Grade-Imprimerie-', '2éme Grade-Imprimerie-', '3éme Grade-Imprimerie-',],
  'Adjoint technique':['Adjoint technique grade principal', 'Adjoint technique 1er grade', 'Adjoint technique 2eme grade', 'Adjoint administratif technique principal -Imprimerie-', 'Adjoint technique 1er grade -Imprimerie-', 'Adjoint technique 2eme grade -Imprimerie-']
};

// Define the mapping of grade to classeOptions
const gradeClasseMapping = (selectedCadre) => {
  // Define the mapping of grade to classeOptions based on the selected cadre
  
  if (selectedCadre) {
    if (selectedCadre === "Ingénieur") {
      return {
        'Grade Principal': ['402-01', '428-02', '456-03', '484-04', '512-05', '564-06'],
        'Premier Grade': ['275-01', '300-02', '326-03', '351-04', '377-05'],
      };
    } else if (selectedCadre === "Technicien") {
      return {
        '1er Grade': ['336-01', '369-02', '403-03', '436-04', '472-05', '509-06', '542-07', '574-08', '606-09', '639-10', '675-11', '690-12', '704-13'],
        '2éme Grade': ['275-01', '300-02', '326-03', '351-04', '377-05', '402-06', '428-07', '456-08', '484-09', '512-10', '564-ex'],
        '3éme Grade': ['235-01', '253-02', '274-03', '296-04', '317-05', '339-06', '361-07', '382-08', '404-09', '438-10'],
        '4éme Grade': ['207-01', '224-02', '241-03', '259-04', '276-05', '293-06', '311-07', '332-08', '353-09', '373-10'],
      };
    } else if (selectedCadre === "Administrateur") {
      return {
        '1er Grade': ['704-01', '746-02', '779-03', '812-04', '840-05', '870-06'],
        '2éme Grade': ['336-01', '369-02', '403-03', '436-04', '472-05', '509-06', '542-07', '574-08', '606-09', '639-10','704-ex'],
        '3éme Grade': ['275-01', '300-02', '326-03', '351-04', '377-05', '402-06', '428-07', '456-08', '484-09', '512-10', '564-ex'],
        '1er Grade-Imprimerie-': ['704-01', '746-02', '779-03', '812-04', '840-05', '870-06'],
        '2éme Grade-Imprimerie-': ['336-01', '369-02', '403-03', '436-04', '472-05', '509-06', '542-07', '574-08', '606-09', '639-10','704-ex'],
        '3éme Grade-Imprimerie-': ['275-01', '300-02', '326-03', '351-04', '377-05', '402-06', '428-07', '456-08', '484-09', '512-10', '564-ex'],
      };
  } else if (selectedCadre === "Adjoint technique") {
    return {
      'Adjoint technique grade principal': ['235-01', '253-02', '274-03', '296-04', '317-05', '339-06', '361-07', '382-08', '404-09', '438-10'],
      'Adjoint technique 1er grade': ['207-01', '224-02', '241-03', '259-04', '276-05', '293-06', '311-07', '332-08', '353-09', '373-10'],
      'Adjoint technique 2eme grade': ['153-01', '161-02', '173-03', '185-04', '197-05', '209-06', '222-07', '236-08', '249-09', '262-10'],
      'Adjoint administratif technique principal -Imprimerie-': ['235-01', '253-02', '274-03', '296-04', '317-05', '339-06', '361-07', '382-08', '404-09', '438-10'],
      'Adjoint technique 1er grade -Imprimerie-': ['207-01', '224-02', '241-03', '259-04', '276-05', '293-06', '311-07', '332-08', '353-09', '373-10'],
      'Adjoint technique 2eme grade -Imprimerie-': ['153-01', '161-02', '173-03', '185-04', '197-05', '209-06', '222-07', '236-08', '249-09', '262-10'],
    };
  }
}
return {};
};
export default function ColumnPinningDynamicRowHeight({prof}) {
  const navigate = useNavigate();

  //Classe
  const [selectedClasse, setSelectedClasse] = useState(null);

  const handleClasseChange = (event, newValue) => {
    setSelectedClasse(newValue);
  };

  //Grade
  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleGradeChange = (event, newValue) => {
    setSelectedGrade(newValue);

    // Clear the selected classe when grade changes
    setSelectedClasse(null);
  };

  const [selectedCadre, setSelectedCadre] = useState(null);
  const handleCadreChange = (event, newValue) => {
    setSelectedCadre(newValue);

    // Clear the selected grade and classe when cadre changes
    setSelectedGrade(null);
    setSelectedClasse(null);
  };
  
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
  const [selectedService, setSelectedService] = useState(null);
  const [selectedFonction, setSelectedFonction] = useState(null);
  

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };
  const handleServiceChange = (event, newValue) => {
    setSelectedService(newValue);
  };
  const handleFonctionChange = (event, newValue) => {
    setSelectedFonction(newValue);
  };


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
      cadre: selectedCadre,
      grade:selectedGrade,
      classe:selectedClasse,
      departement:selectedService
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



            <Grid item xs={4} >
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Cadre (الإطار )
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                
                  options={cadreOptions}
                  value={selectedCadre}
                  onChange={handleCadreChange}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Grade (الدرجة)
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                  options={selectedCadre ? cadreGradeMapping[selectedCadre] : []}
                  value={selectedGrade}
                  onChange={handleGradeChange}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Indice-Échelon (الرتبة)
                </Typography>
                <Autocomplete
                    id="classe-autocomplete"
                    options={selectedGrade ? gradeClasseMapping(selectedCadre)[selectedGrade] : []}
                    value={selectedClasse}
                    onChange={handleClasseChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
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

            <Grid item xs={2} >
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Service (خدمة)
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                  options={serviceOptions}
                  value={selectedService}
                  onChange={handleServiceChange}
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

