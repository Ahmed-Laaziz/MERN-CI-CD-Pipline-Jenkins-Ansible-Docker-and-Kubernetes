import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import axios from 'axios';
const backLink = process.env.REACT_APP_BACK_LINK
const steps = ['données personnelles', 'données professionnelles', 'données supplémentaires'];
const genreOptions = ['Homme', 'Femme']
const departementOptions = ['TRI', 'GE', 'CP']
const cadreOptions = ["Professeur de l'enseignement superieur", 'Professeur habilité', 'Professeur assistant'];
// const gradeOptions = ['Grade 1', 'Grade 2'];
// const classeOptions = ['Classe 1', 'Classe 2'];
// Define the mapping of cadreOptions to gradeOptions
const cadreGradeMapping = {
  "Professeur de l'enseignement superieur": ['Grade D', 'Grade C', 'Grade B', 'Grade A'],
  'Professeur habilité': ['Grade C', 'Grade B', 'Grade A'],
  'Professeur assistant': ['Grade D', 'Grade C', 'Grade B', 'Grade A'],
};

// Define the mapping of grade to classeOptions
const gradeClasseMapping = (selectedCadre) => {
  // Define the mapping of grade to classeOptions based on the selected cadre
  
  if (selectedCadre) {
    if (selectedCadre === "Professeur de l'enseignement superieur") {
      return {
        'Grade D': ['1095-01', '1125-02', '1155-03', '1185-04', '1215-05'],
        'Grade C': ['975-01', '1005-02', '1035-03', '1065-04'],
        'Grade B': ['860-01', '885-02', '915-03', '945-04'],
        'Grade A': ['760-01', '785-02', '810-03', '835-04'],
      };
    } else if (selectedCadre === "Professeur habilité") {
      return {
        'Grade C': ['900-01', '930-02', '960-03', '990-04', '1020-05'],
        'Grade B': ['779-01', '812-02', '840-03', '870-04'],
        'Grade A': ['580-01', '620-02', '660-03', '720-04'],
      };
    } else if (selectedCadre === "Professeur assistant") {
      return {
        'Grade D': ['930-01', '960-02', '990-03', '1020-04'],
        'Grade C': ['812-01', '840-02', '870-03', '900-04'],
        'Grade B': ['639-01', '704-02', '746-03', '779-04'],
        'Grade A': ['509-01', '542-02', '574-03', '606-04'],
      };
    }
}
return {};
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function HorizontalNonLinearStepper() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    if (completedSteps() === totalSteps()){
      setOpen(true);
      addProfesseur();
    }
  };
  const handleCancelModal = () => {
    console.log("cancel clicked");
    setOpen(!open);
  }

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
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

  //name 
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
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
  

  

  const [loyerValue, setLoyerValue] = useState('');
  const [preuveValue, setPreuveValue] = useState('');
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Remove any non-numeric characters using a regular expression
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setLoyerValue(numericValue);
  };
  const handlePreuveInputChange = (event) => {
    const inputValue = event.target.value;
    // Remove any non-numeric characters using a regular expression
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setPreuveValue(numericValue);
  };

  //Cadre
  const [selectedCadre, setSelectedCadre] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDepartement, setSelectedDepartement] = useState(null);
  const handleCadreChange = (event, newValue) => {
    setSelectedCadre(newValue);

    // Clear the selected grade and classe when cadre changes
    setSelectedGrade(null);
    setSelectedClasse(null);
  };

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };
  const handleDepartementChange = (event, newValue) => {
    setSelectedDepartement(newValue);
  };

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

  //Date fonction
  const [selectedDateFct, setSelectedDateFct] = useState(null);

  // Function to handle date selection
  const handleDateFctChange = (date) => {
    setSelectedDateFct(date);
  };

  //Date etablissement
  const [selectedDateSchool, setSelectedDateSchool] = useState(null);

  const handleDateSchoolChange = (date) => {
    setSelectedDateSchool(date);
  };

  //Date visa
  const [selectedDateVisa, setSelectedDateVisa] = useState(null);

  const handleDateVisaChange = (date) => {
    setSelectedDateVisa(date);
  };
  //Date effective
  const [selectedDateEffective, setSelectedDateEffective] = useState(null);

  const handleDateEffectiveChange = (date) => {
    setSelectedDateEffective(date);
  };



  const addProfesseur = async () => {
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
        num_loyer: loyerValue,
        date_entre_ecole: selectedDateSchool,
        date_fct_publique:selectedDateFct,
        cadre:selectedCadre,
        num_ref:2121,
        date_effective:selectedDateEffective,
        anciennete:"2 ans",
        date_visa:selectedDateVisa,
        grade:selectedGrade,
        classe:selectedClasse,
        departement:selectedDepartement
      };
      console.log("collected prof infos : " + requestData.nom)
      // Make a POST request to your backend API
      const response = await axios.post(url, requestData);
      
    } catch (error) {
      console.error("Error fetching abstract:", error);
    } finally {
      // Hide the spinner after the backend request is completed
      // setIsLoading(false);
    }
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
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <Grid container spacing={2} style={{marginTop:"2%"}}>
            <Grid item xs={3} >
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  &nbsp;&nbsp;Prénom 
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
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
            <Grid item xs={3}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  CIN (رقم ب.ت.وطنية)
                </Typography>
                <TextField
                //   label="French Label 3"
                  variant="outlined"
                  fullWidth
                  value={cin}
                  onChange={handleCINChange}
                  error={cinError}
                  helperText={cinHelperText}
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Email (البريد الإلكتروني)
                </Typography>
                <TextField
                variant="outlined"
                fullWidth
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
        )}

{activeStep === 2 && (
          <Grid container spacing={2} style={{marginTop:"2%"}}>
            <Grid item xs={6} >
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Numéro de loyer (رقم التأجير)
                </Typography>
                <TextField
      variant="outlined"
      fullWidth
      value={loyerValue}
      onChange={handleInputChange}
    />
              </div>
            </Grid>
            <Grid item xs={6}>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Numéro de preuve (الرقم الاستدلالي)
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={preuveValue}
                  onChange={handlePreuveInputChange}
    />
              </div>
            </Grid>
            
            
            
            <Grid item xs={6}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Date du visa (تاريخ التأشيرة)
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                value={selectedDateVisa} // Pass the selectedDate as the value
                onChange={handleDateVisaChange} // Handle date selection
                sx={{width:"100%"}}/>
              </LocalizationProvider>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Typography variant="subtitle1" gutterBottom>      
                  Date effective (تاريخ المفعول )
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                value={selectedDateEffective} // Pass the selectedDate as the value
                onChange={handleDateEffectiveChange} // Handle date selection
                sx={{width:"100%"}}/>
              </LocalizationProvider>
              </div>
            </Grid>
            
            
          </Grid>
        )}


        {activeStep === 1 && (
          <Grid container spacing={2} style={{marginTop:"2%"}}>
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
            <Grid item xs={4}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Date d'entrée dans la fonction publique (ت. و الوظيفة العمومية)
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                value={selectedDateFct} // Pass the selectedDate as the value
                onChange={handleDateFctChange} // Handle date selection
                sx={{width:"100%"}}/>
              </LocalizationProvider>
              </div>
            </Grid>
            <Grid item xs={2}>
              
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Département (قسم)
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                  options={departementOptions}
                  value={selectedDepartement}
                  onChange={handleDepartementChange}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Ancienneté (الـأقدمية)
                </Typography>
                <TextField
                //   label="French Label 3"
                  variant="outlined"
                  fullWidth
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Date d'entrée dans l'établissement (ت.و. المؤسسة)
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                value={selectedDateSchool} // Pass the selectedDate as the value
                onChange={handleDateSchoolChange} // Handle date selection
                sx={{width:"100%"}}/>
              </LocalizationProvider>
              </div>
            </Grid>
            
            
          </Grid>
        )}
        {allStepsCompleted() ? (
          <React.Fragment>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Un profile professeur a été ajouté avec succès
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              un email a été envoyé au professeur pour s'authentifier
              </Typography>
              <Button component={Link} to="/all-professors" variant="contained" sx={{ marginTop: '5%' }}>
              Cancel
            </Button>
            </Box>
          </Modal>
          </React.Fragment>
          
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Etape {activeStep + 1}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Retour
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Suivant
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Etape {activeStep + 1} déja accomplie
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Terminer'
                      : 'Etape accompie'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
