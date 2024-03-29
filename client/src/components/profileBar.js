import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepContent } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useProf } from '../context/ProfContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const backLink = process.env.REACT_APP_BACK_LINK;

export default function UserCard({ agent }) {
  const navigate = useNavigate();
  const isAdmin = agent && agent.__t === 'Admin';
  const isProfesseur = agent && agent.__t === 'Professeur';

  const { hist } = useProf();

  const cadreOptions = ["Professeur de l'enseignement superieur", 'Maitre de conférences habilité', 'Maitre de conférences', "Ingénieur", 'Technicien', 'Administrateur', 'Adjoint technique'];
  const genreOptions = ['Homme', 'Femme'];
  const serviceOptions = ['Rh', 'Scolarité', 'Informatique']
  const cadreOptions2 = ["Ingénieur", 'Technicien', 'Administrateur', 'Adjoint technique'];

const cadreGradeMapping2 = {
  "Ingénieur": ['Grade Principal', 'Premier Grade'],
  'Technicien': ['1er Grade', '2éme Grade', '3éme Grade', '4éme Grade'],
  'Administrateur': ['1er Grade', '2éme Grade', '3éme Grade','1er Grade-Imprimerie-', '2éme Grade-Imprimerie-', '3éme Grade-Imprimerie-',],
  'Adjoint technique':['Adjoint technique grade principal', 'Adjoint technique 1er grade', 'Adjoint technique 2eme grade', 'Adjoint administratif technique principal -Imprimerie-', 'Adjoint technique 1er grade -Imprimerie-', 'Adjoint technique 2eme grade -Imprimerie-']
};
  const cadreGradeMapping = {
    "Professeur de l'enseignement superieur": ['Grade D', 'Grade C', 'Grade B', 'Grade A'],
    'Maitre de conférences habilité': ['Grade C', 'Grade B', 'Grade A'],
    'Maitre de conférences': ['Grade D', 'Grade C', 'Grade B', 'Grade A'],
    "Ingénieur": ['Grade Principal', 'Premier Grade'],
    'Technicien': ['1er Grade', '2éme Grade', '3éme Grade', '4éme Grade'],
    'Administrateur': ['1er Grade', '2éme Grade', '3éme Grade','1er Grade-Imprimerie-', '2éme Grade-Imprimerie-', '3éme Grade-Imprimerie-',],
    'Adjoint technique':['Adjoint technique grade principal', 'Adjoint technique 1er grade', 'Adjoint technique 2eme grade', 'Adjoint administratif technique principal -Imprimerie-', 'Adjoint technique 1er grade -Imprimerie-', 'Adjoint technique 2eme grade -Imprimerie-']
  };
  const gradeClasseMapping = {
    'Grade D': ['930-01', '960-02', '990-03', '1020-04'],
    'Grade C': ['812-01', '840-02', '870-03', '900-04'],
    'Grade B': ['639-01', '704-02', '746-03', '779-04'],
    'Grade A': ['509-01', '542-02', '574-03', '606-04'],
    '1er Grade': ['336-01', '369-02', '403-03', '436-04', '472-05', '509-06', '542-07', '574-08', '606-09', '639-10', '675-11', '690-12', '704-13'],
        '2éme Grade': ['275-01', '300-02', '326-03', '351-04', '377-05', '402-06', '428-07', '456-08', '484-09', '512-10', '564-ex'],
        '3éme Grade': ['235-01', '253-02', '274-03', '296-04', '317-05', '339-06', '361-07', '382-08', '404-09', '438-10'],
        '4éme Grade': ['207-01', '224-02', '241-03', '259-04', '276-05', '293-06', '311-07', '332-08', '353-09', '373-10'],
        'Grade Principal': ['402-01', '428-02', '456-03', '484-04', '512-05', '564-06'],
        'Premier Grade': ['275-01', '300-02', '326-03', '351-04', '377-05'],
        '1er Grade-Imprimerie-': ['704-01', '746-02', '779-03', '812-04', '840-05', '870-06'],
        '2éme Grade-Imprimerie-': ['336-01', '369-02', '403-03', '436-04', '472-05', '509-06', '542-07', '574-08', '606-09', '639-10','704-ex'],
        '3éme Grade-Imprimerie-': ['275-01', '300-02', '326-03', '351-04', '377-05', '402-06', '428-07', '456-08', '484-09', '512-10', '564-ex'],
        'Adjoint technique grade principal': ['235-01', '253-02', '274-03', '296-04', '317-05', '339-06', '361-07', '382-08', '404-09', '438-10'],
          'Adjoint technique 1er grade': ['207-01', '224-02', '241-03', '259-04', '276-05', '293-06', '311-07', '332-08', '353-09', '373-10'],
          'Adjoint technique 2eme grade': ['153-01', '161-02', '173-03', '185-04', '197-05', '209-06', '222-07', '236-08', '249-09', '262-10'],
          'Adjoint administratif technique principal -Imprimerie-': ['235-01', '253-02', '274-03', '296-04', '317-05', '339-06', '361-07', '382-08', '404-09', '438-10'],
          'Adjoint technique 1er grade -Imprimerie-': ['207-01', '224-02', '241-03', '259-04', '276-05', '293-06', '311-07', '332-08', '353-09', '373-10'],
          'Adjoint technique 2eme grade -Imprimerie-': ['153-01', '161-02', '173-03', '185-04', '197-05', '209-06', '222-07', '236-08', '249-09', '262-10'],
  };

  const gradeClasseMapping2 = (selectedCadre) => {
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

  const steps = ['données personnelles', 'données professionnelles', 'données supplémentaires'];

  // For both admin and professor 
  const [idValue, setIdValue] = useState(null);
  const [nomValue, setNomValue] = useState(null);
  const [prenomValue, setPrenomValue] = useState(null);
  const [nisbaValue, setNisbaValue] = useState(null);
  const [asmValue, setAsmValue] = useState(null);
  const [cinValue, setCINValue] = useState(null);
  const [telValue, setTelValue] = useState(null);
  const [emailValue, setEmailValue] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // For professor only
  const [selectedCadre, setSelectedCadre] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [selectedDateFct, setSelectedDateFct] = useState(null);
  const [selectedDateSchool, setSelectedDateSchool] = useState(null);
  const [loyerValue, setLoyerValue] = useState('');
  const [preuveValue, setPreuveValue] = useState('');
  const [ancienneteValue, setAncienneteValue] = useState('');
  const [selectedDateVisa, setSelectedDateVisa] = useState(null);
  const [selectedDateEffective, setSelectedDateEffective] = useState(null);

  

  const [activeStep, setActiveStep] = useState(0);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function formatDate(inputDate) {
    const parts = inputDate.split('/');
    if (parts && (parts.length === 3)) {
      // Ensure that the input date is in the format 'MM/DD/YYYY'
      const month = parts[0];
      const day = parts[1];
      const year = parts[2];
  
      // Create a new date in 'YYYY-MM-DD' format
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
  
    // Return the input as is if it's not in the expected format
    return inputDate;
  }

  const handleValidate = () => {
    //For both admin and professor
    setIdValue(agent._id ? agent._id : '');
    setNomValue(agent.nom ? agent.nom.split('|')[0] : '');
    setPrenomValue(agent.prenom ? agent.prenom.split('|')[0] : '');
    setNisbaValue(agent.nom ? agent.nom.split('|')[1] : '');
    setAsmValue(agent.prenom ? agent.prenom.split('|')[1] : '');
    setCINValue(agent ? agent.cin : '');
    setTelValue(agent ? agent.tel : '');
    setEmailValue(agent ? agent.email : '');
    setSelectedGenre(agent ? agent.genre : null);
    setSelectedDepartement(agent ? agent.departement : null)

    //For professor only
    setSelectedCadre(hist && hist[0] ? hist[0].cadre : '--');
    setSelectedGrade(hist && hist[0] ? hist[0].grade : '--');
    setSelectedClasse(hist && hist[0] ? hist[0].classe : '--');
    setSelectedDateFct(agent.date_fct_publique ? dayjs(formatDate(agent.date_fct_publique)) : null);
    setSelectedDateSchool(agent.date_entre_ecole ? dayjs(formatDate(agent.date_entre_ecole)) : null);
    setLoyerValue(agent.num_loyer ? agent.num_loyer: '');
    setAncienneteValue(agent.anciennete ? agent.anciennete.replace(/\D/g, '') : '');
    setPreuveValue(agent.num_ref ? agent.num_ref : '');
    setSelectedDateVisa(agent.date_visa ? dayjs(formatDate(agent.date_visa)) : null);
    setSelectedDateEffective(agent.date_effective ? dayjs(formatDate(agent.date_effective)) : null);

    setOpenAtt2(true);
  }

  const handleSubmit = async () => {
    const newProf = {
      id: idValue,
      num_loyer: loyerValue,
      date_entre_ecole: selectedDateSchool,
      date_fct_publique: selectedDateFct,
      departement: selectedDepartement,
      num_ref: 2121,
      date_effective: selectedDateEffective,
      anciennete: ancienneteValue,
      date_visa: selectedDateVisa,
      nom: nomValue+" | "+nisbaValue,
      prenom: prenomValue+" | "+asmValue,
      email: emailValue,
      tel: telValue,
      cin: cinValue,
      genre: selectedGenre,
      cadre: selectedCadre
    } 

    const newHist = {  
      cadre : selectedCadre,    
      grade: selectedGrade,
      classe: selectedClasse,
    }

    console.log("The new prof is : ")
    console.log(newProf)

    console.log("The new hist is : ")
    console.log(newHist)

    const updatedProf = await axios.put(
      backLink+`/prof/update-professeur`, {"prof": newProf, "hist": newHist} // Replace with your actual API endpoint
    );
    navigate('/all-professors')
    handleClose();
  }

  const handleSubmitFonc = async () => {
    const newFonc = {
      id: idValue,
      departement: selectedDepartement,
      num_ref: preuveValue,
      nom: nomValue+" | "+nisbaValue,
      prenom: prenomValue+" | "+asmValue,
      email: emailValue,
      tel: telValue,
      cin: cinValue,
      genre: selectedGenre,
      cadre: selectedCadre
    } 

    const newHist = {  
      cadre : selectedCadre,    
      grade: selectedGrade,
      classe: selectedClasse,
    }

    console.log("The new fonc is : ")
    console.log(newFonc)

    console.log("The new hist is : ")
    console.log(newHist)

    const updatedProf = await axios.put(
      backLink+`/fonctionnaire/update-fonc`, {"fonc": newFonc, "hist": newHist} // Replace with your actual API endpoint
    );
    navigate('/all-fonctionnaires')
    handleClose();
  }

  const handleClose = () => {
    setOpenAtt2(false);
  }

  const [openAtt2, setOpenAtt2] = useState(false);

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [firstNameHelperText, setFirstNameHelperText] = React.useState('');
  const [lastNameHelperText, setLastNameHelperText] = React.useState('');

  const [cinError, setCinError] = React.useState(false);
  const [cinHelperText, setCinHelperText] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState('');

  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberHelperText, setPhoneNumberHelperText] = React.useState('');

  const [anciennteError, setAnciennteError] = React.useState(false);
  const [ancienneteHelperText, setAnciennteHelperText] = React.useState('');

  const validateName = (name) => {
    // A simple regex pattern to validate names (alphabetic characters only)
    const nameRegex = /^[A-Za-z\s]*$/;
    return nameRegex.test(name);
  };

  const validateCin = (cin) => {
    // A simple regex pattern to validate CIN format: two capital letters followed by six numbers
    const cinRegex = /^[A-Z]{2}\d{6}$/;
    return cinRegex.test(cin);
  };

  const validateEmail = (email) => {
    // A simple regex pattern to validate email addresses
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateAnciennte = (anciennete) => {
    const ancRegex = /\D*(\d{1,2})\D*/;
    return ancRegex.test(anciennete);
  }

  // Handle changes for "Nom" field
const handleNomChange = (event) => {
  // Assuming you have a state variable to store the edited value, e.g., nomValue
  setNomValue(event.target.value);

  if (!validateName(event.target.value)) {
    setLastNameError(true);
    setLastNameHelperText('Invalid last name format. Please enter a valid last name.');
  } else {
    setLastNameError(false);
    setLastNameHelperText('');
  }
};

// Handle changes for "Prenom" field
const handlePrenomChange = (event) => {
  // Assuming you have a state variable to store the edited value, e.g., prenomValue
  setPrenomValue(event.target.value);

  if (!validateName(event.target.value)) {
    setFirstNameError(true);
    setFirstNameHelperText('Invalid first name format. Please enter a valid first name.');
  } else {
    setFirstNameError(false);
    setFirstNameHelperText('');
  }
};

// Handle changes for "النسب" field
const handleNisbaChange = (event) => {
  // Assuming you have a state variable to store the edited value, e.g., nisbaValue
  setNisbaValue(event.target.value);
};

// Handle changes for "الأسم" field
const handleAsmChange = (event) => {
  // Assuming you have a state variable to store the edited value, e.g., asmValue
  setAsmValue(event.target.value);
};

// Handle changes for "CIN" field
const handleCINChange = (event) => {
  // Assuming you have a state variable to store the edited value, e.g., cinValue
  setCINValue(event.target.value);

  if (validateCin(event.target.value)){
    setCinError(false);
    setCinHelperText('');
  }
  else if (!validateCin(event.target.value)) {
    setCinError(true);
    setCinHelperText('Invalid CIN format. Please enter a valid CIN (e.g., AB123456).');
  }
   
   else {
    setCinError(false);
    setCinHelperText('');
  }
};

// Handle changes for "Numéro téléphone" field
const handleTelChange = (event) => {
  // Assuming you have a state variable to store the edited value, e.g., telValue
  setTelValue(event.target.value);

  if (validatePhoneNumber(event.target.value)){
    setPhoneNumberError(false);
    setPhoneNumberHelperText('');
  }
  else if (!validatePhoneNumber(event.target.value)) {
    setPhoneNumberError(true);
    setPhoneNumberHelperText('Invalid phone number. It must be 9 numeric characters.');
  } else {
    setPhoneNumberError(false);
    setPhoneNumberHelperText('');
  }
};

// Handle changes for "Email" field
const handleEmailChange = (event) => {
  // Assuming you have a state variable to store the edited value, e.g., emailValue
  setEmailValue(event.target.value);

  if (validateEmail(event.target.value)){
    setEmailError(false);
    setEmailHelperText('');
  }
  else if (!validateEmail(event.target.value)) {
    setEmailError(true);
    setEmailHelperText('Invalid email address. Please enter a valid email.');
  } else {
    setEmailError(false);
    setEmailHelperText('');
  }
};

const [departementOptions, setDepartementOptions] = React.useState([])

  const fetchDepartements = async () => {
    try {
      const response = await axios.get(`${backLink}/departements/all-departements`);
      const libeleValues = response.data.map((departement) => departement.libele);
      setDepartementOptions(libeleValues);
      console.log("deps: " + libeleValues);
    } catch (error) {
      console.error('Error fetching departements:', error);
    }
  };

  

  const [selectedDepartement, setSelectedDepartement] = useState(null);

  const handleDepartementChange = (event, newValue) => {
    setSelectedDepartement(newValue);
  };

const handleGenreChange = (event, newValue) => {
  setSelectedGenre(newValue);
};

const handleCadreChange = (event, newValue) => {
  setSelectedCadre(newValue);

  // Clear the selected grade and classe when cadre changes
  setSelectedGrade('--');
  setSelectedClasse('--');
};

  const handleGradeChange = (event, newValue) => {
    setSelectedGrade(newValue);

    // Clear the selected classe when grade changes
    setSelectedClasse('--');
  };

  const handleClasseChange = (event, newValue) => {
    setSelectedClasse(newValue);
  };

  const handleDateFctChange = (date) => {
    setSelectedDateFct(date);
  };

  const handleDateSchoolChange = (date) => {
    setSelectedDateSchool(date);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setLoyerValue(numericValue);
  };

  const handlePreuveInputChange = (event) => {
    const inputValue = event.target.value;
    // Remove any non-numeric characters using a regular expression
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setPreuveValue(numericValue);
  };

  const handleAnciennte = (event) => {

    setAncienneteValue(event.target.value);

    if (!validateAnciennte(event.target.value)) {
      setAnciennteError(true);
      setAnciennteHelperText('Invalid anciennte format. Please enter a valid anciennte.');
    } else {
      setAnciennteError(false);
      setAnciennteHelperText('');
    }
  };

  const handleDateVisaChange = (date) => {
    setSelectedDateVisa(date);
  };

  const handleDateEffectiveChange = (date) => {
    setSelectedDateEffective(date);
  };



const updateAdmin = async () => {
  try {
    // Show the spinner while the backend request is in progress
    // setIsLoading(true);
    const url = backLink+"/admin/update-admin"; // URL for the backend API
    const requestData = {
      adminId: idValue,
      nom: nomValue+"|"+nisbaValue, // Send the user input as a parameter in the request body
      prenom: prenomValue+"|"+asmValue,
      email: emailValue,
      tel: telValue,
      cin: cinValue,
      genre: selectedGenre,
    };

    // Make a POST request to your backend API
    const response = await axios.put(url, requestData);
    console.log("admin updated successfully !")
    setOpenAtt2(false);
    
  } catch (error) {
    console.error("Error fetching abstract:", error);
  } finally {
    // Hide the spinner after the backend request is completed
    // setIsLoading(false);
  }
};

  
useEffect(()=>{
  fetchDepartements()
}, [])

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
          {agent ? agent.prenom.split('|')[0]  + " " + agent.nom.split('|')[0] + "   |   " +  agent.prenom.split('|')[1]  + " " + agent.nom.split('|')[1] : 'Loading...'} 
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
          {isAdmin ? agent.fonction : (isProfesseur && agent.cadre ? agent.cadre : 'Loading...')}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                CIN
              </Typography>
              <Typography fontWeight="lg">{agent ? agent.cin : 'Loading...'} </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Email
              </Typography>
              <Typography fontWeight="lg">{agent ? agent.email : 'Loading...'}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Tel
              </Typography>
              <Typography fontWeight="lg">{agent ? "+212 "+agent.tel.replace(/^0+/, '') : 'Loading...'}</Typography>
            </div>
          </Sheet>
          { localStorage.getItem('type') === 'Admin' && agent && agent.fonction != "Chef de Département" ? (
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="solid" color="primary"
            onClick={handleValidate}>
              Modifier
            </Button>
          </Box>
          ) : localStorage.getItem('type') === 'Professeur' ? (
            <></>
          ) : null}
        </CardContent>
      </Card>

      { agent && agent.departement && departementOptions.includes(agent.departement) ? (
      <Modal open={openAtt2} onClose={() => handleClose()}>
      <ModalDialog>
        <DialogTitle> تحديث بيانات المستخدم</DialogTitle>
        <DialogContent>Modifier les données utilisateur</DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleClose();
          }}
        >
          <Stack spacing={2}>
          <FormControl>
          <Stepper activeStep={activeStep} orientation="vertical">
      <Step key="Step1">

        <StepContent style={{ width: '30em' }}>
          
            <Grid container spacing={2} style={{ marginTop: "1%" }}>
              <Grid item xs={6}>
                <FormLabel>Nom :</FormLabel>
                <TextField
                  variant="outlined"
                  value={nomValue}
                  error={lastNameError}
                  helperText={lastNameHelperText}
                  onChange={(e) => handleNomChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Prenom :</FormLabel>
                <TextField
                  variant="outlined"
                  value={prenomValue}
                  error={firstNameError}
                  helperText={firstNameHelperText}
                  onChange={(e) => handlePrenomChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "1%" }}>
              <Grid item xs={6}>
                <FormLabel>النسب :</FormLabel>
                <TextField
                  variant="outlined"
                  value={nisbaValue}
                  onChange={(e) => handleNisbaChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>الأسم :</FormLabel>
                <TextField
                  variant="outlined"
                  value={asmValue}
                  onChange={(e) => handleAsmChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "1%" }}>
              <Grid item xs={6}>
                <FormLabel> CIN (رقم ب.ت.وطنية) :</FormLabel>
                <TextField
                  variant="outlined"
                  value={cinValue}
                  error={cinError}
                  helperText={cinHelperText}
                  onChange={(e) => handleCINChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Numéro téléphone (رقم الهاتف) :</FormLabel>
                <TextField
                  variant="outlined"
                  value={telValue}
                  onChange={(e) => handleTelChange(e)}
                  error={phoneNumberError}
                    helperText={phoneNumberHelperText}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+212</InputAdornment>
                      ),
                    }}
                />
              </Grid>
            </Grid>
            <Grid container style={{marginTop:"4%"}} xs={12}>
                          <FormLabel>Genre (الجنس) :</FormLabel>
                          <Autocomplete
                            id="cadre-autocomplete-professor"
                            fullWidth
                            options={genreOptions}
                            value={selectedGenre}
                            onChange={handleGenreChange}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                          />
                        </Grid>
            <Grid container style={{ marginTop: "4%" }}>
              <FormLabel> Email (البريد الإلكتروني) :</FormLabel>
              <TextField
                variant="outlined"
                value={emailValue}
                error={emailError}
                helperText={emailHelperText}
                onChange={(e) => handleEmailChange(e)}
                fullWidth
              />
            </Grid>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }} style={{marginTop:"12%"}}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button id="step3ne" variant="solid" onClick={handleNext}>
              Next
            </Button>
            </Box>
        </StepContent>
      </Step>
      <Step key="Step2">
<StepContent style={{ width: '30em' }}>
  <Grid container style={{ marginTop: '1%' }} xs={12}>
    <FormLabel>Cadre (الإطار) :</FormLabel>
    {cadreOptions && cadreOptions.length > 0 && (
      <Autocomplete
        fullWidth
        id="cadre-autocomplete"
        options={cadreOptions}
        value={selectedCadre}
        onChange={handleCadreChange}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    )}
  </Grid>
  <Grid container spacing={2} style={{ marginTop: '2%' }}>
    <Grid item xs={6}>
      <FormLabel>Grade (الدرجة)</FormLabel>
      {selectedCadre && selectedCadre.length > 0 && (
        <Autocomplete
          id="grade-autocomplete"
          options={selectedCadre ? cadreGradeMapping[selectedCadre] || [] : []}
          value={selectedGrade}
          onChange={handleGradeChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      )}
    </Grid>
    <Grid item xs={6}>
      <FormLabel>Indice-Échelon (الرتبة)</FormLabel>
      {selectedGrade && selectedGrade.length > 0 && (
        <Autocomplete
          id="classe-autocomplete"
          options={selectedGrade ? gradeClasseMapping[selectedGrade] || [] : []}
          value={selectedClasse}
          onChange={handleClasseChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      )}
    </Grid>
  </Grid>
  <Grid container style={{ marginTop: '4%' }} xs={12}>
    <FormLabel>Date d'entrée dans la fonction publique (ت. و الوظيفة العمومية)</FormLabel>
    {selectedGrade && selectedGrade.length > 0 && (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          fullWidth
          id="fctdate"
          value={selectedDateFct}
          onChange={handleDateFctChange}
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>
    )}
  </Grid>
  <Grid container style={{ marginTop: '4%' }} xs={12}>
    <FormLabel>Date d'entrée dans l'établissement (ت.و. المؤسسة)</FormLabel>
    {selectedGrade && selectedGrade.length > 0 && (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          fullWidth
          id="schdate"
          value={selectedDateSchool}
          onChange={handleDateSchoolChange}
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>
    )}
  </Grid>
  <Grid container style={{ marginTop: '4%' }} xs={12}>
    <FormLabel>Ancienneté (الـأقدمية)</FormLabel>
    <TextField
      variant="outlined"
      fullWidth
      error={anciennteError}
      helperText={ancienneteHelperText}
      value={ancienneteValue}
      onChange={handleAnciennte}
    />
  </Grid>
  <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }} style={{ marginTop: '12%' }}>
    <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="primary">
      Back
    </Button>
    <Button id="step2ne" variant="solid" onClick={handleNext}>
      Next
    </Button>
  </Box>
</StepContent>
</Step>

      <Step key="Step3">

        <StepContent style={{ width: '30em' }}>
        <Grid item xs={6}>
      <FormLabel>Département (قسم)</FormLabel>
      {selectedDepartement && selectedDepartement.length > 0 && (
        <Autocomplete
          id="grade-autocomplete"
          options={departementOptions ? departementOptions : []}
          value={selectedDepartement}
          onChange={handleDepartementChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      )}
    </Grid>
            <Grid container style={{marginTop:"4%"}} xs={12}>
                <FormLabel>
                Numéro de loyer (رقم التأجير)
                </FormLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={loyerValue}
                  onChange={handleInputChange}
                />
            </Grid>
            <Grid container style={{marginTop:"4%"}} xs={12}>
              <FormLabel>
              Numéro de preuve (الرقم الاستدلالي)
              </FormLabel>
              <TextField
                variant="outlined"
                fullWidth
                value={preuveValue}
                onChange={handlePreuveInputChange}
            />
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "2%" }}>
              <Grid item xs={6}>
                  <FormLabel>
                    Date du visa (تاريخ التأشيرة)
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker 
                  value={selectedDateVisa} // Pass the selectedDate as the value
                  onChange={handleDateVisaChange} // Handle date selection
                  sx={{width:"100%"}}/>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                  <FormLabel>      
                    Date effective (تاريخ المفعول )
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker 
                  value={selectedDateEffective} // Pass the selectedDate as the value
                  onChange={handleDateEffectiveChange} // Handle date selection
                  sx={{width:"100%"}}/>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }} style={{marginTop:"12%"}}>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="primary">
              Back
            </Button>
            <Button variant="solid" color="primary" onClick={handleSubmit}>
              Valider
            </Button>
            </Box>
        </StepContent>
      </Step>
    </Stepper>
          </FormControl>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
      ) : (
        <Modal open={openAtt2} onClose={() => handleClose()}>
      <ModalDialog>
        <DialogTitle> تحديث بيانات المستخدم</DialogTitle>
        <DialogContent>Modifier les données utilisateur</DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleClose();
          }}
        >
          <Stack spacing={2}>
          <FormControl>
          <Stepper activeStep={activeStep} orientation="vertical">
      <Step key="Step1">

        <StepContent style={{ width: '30em' }}>
          
            <Grid container spacing={2} style={{ marginTop: "1%" }}>
              <Grid item xs={6}>
                <FormLabel>Nom :</FormLabel>
                <TextField
                  variant="outlined"
                  value={nomValue}
                  error={lastNameError}
                  helperText={lastNameHelperText}
                  onChange={(e) => handleNomChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Prenom :</FormLabel>
                <TextField
                  variant="outlined"
                  value={prenomValue}
                  error={firstNameError}
                  helperText={firstNameHelperText}
                  onChange={(e) => handlePrenomChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "1%" }}>
              <Grid item xs={6}>
                <FormLabel>النسب :</FormLabel>
                <TextField
                  variant="outlined"
                  value={nisbaValue}
                  onChange={(e) => handleNisbaChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>الأسم :</FormLabel>
                <TextField
                  variant="outlined"
                  value={asmValue}
                  onChange={(e) => handleAsmChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "1%" }}>
              <Grid item xs={6}>
                <FormLabel> CIN (رقم ب.ت.وطنية) :</FormLabel>
                <TextField
                  variant="outlined"
                  value={cinValue}
                  error={cinError}
                  helperText={cinHelperText}
                  onChange={(e) => handleCINChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Numéro téléphone (رقم الهاتف) :</FormLabel>
                <TextField
                  variant="outlined"
                  value={telValue}
                  onChange={(e) => handleTelChange(e)}
                  error={phoneNumberError}
                    helperText={phoneNumberHelperText}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+212</InputAdornment>
                      ),
                    }}
                />
              </Grid>
            </Grid>
            <Grid container style={{marginTop:"4%"}} xs={12}>
                          <FormLabel>Genre (الجنس) :</FormLabel>
                          <Autocomplete
                            id="cadre-autocomplete-professor"
                            fullWidth
                            options={genreOptions}
                            value={selectedGenre}
                            onChange={handleGenreChange}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                          />
                        </Grid>
            <Grid container style={{ marginTop: "4%" }}>
              <FormLabel> Email (البريد الإلكتروني) :</FormLabel>
              <TextField
                variant="outlined"
                value={emailValue}
                error={emailError}
                helperText={emailHelperText}
                onChange={(e) => handleEmailChange(e)}
                fullWidth
              />
            </Grid>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }} style={{marginTop:"12%"}}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button id="step3ne" variant="solid" onClick={handleNext}>
              Next
            </Button>
            </Box>
        </StepContent>
      </Step>
      <Step key="Step2">
<StepContent style={{ width: '30em' }}>
  <Grid container style={{ marginTop: '1%' }} xs={12}>
    <FormLabel>Cadre (الإطار) :</FormLabel>
    {cadreOptions && cadreOptions.length > 0 && (
      <Autocomplete
        fullWidth
        id="cadre-autocomplete"
        options={cadreOptions2}
        value={selectedCadre}
        onChange={handleCadreChange}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    )}
  </Grid>
  <Grid container spacing={2} style={{ marginTop: '2%' }}>
    <Grid item xs={6}>
      <FormLabel>Grade (الدرجة)</FormLabel>
      {selectedCadre && selectedCadre.length > 0 && (
        <Autocomplete
          id="grade-autocomplete"
          options={selectedCadre ? cadreGradeMapping2[selectedCadre] || [] : []}
          value={selectedGrade}
          onChange={handleGradeChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      )}
    </Grid>
    <Grid item xs={6}>
      <FormLabel>Indice-Échelon (الرتبة)</FormLabel>
      {selectedGrade && selectedGrade.length > 0 && (
        <Autocomplete
          id="classe-autocomplete"
          options={selectedGrade ? gradeClasseMapping2(selectedCadre)[selectedGrade] || [] : []}
          value={selectedClasse}
          onChange={handleClasseChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      )}
    </Grid>
    
  </Grid>
  <Grid item xs={6} style={{ marginTop: '4%' }}>
      <FormLabel>Département (قسم)</FormLabel>
      {serviceOptions && (
        <Autocomplete
          id="grade-autocomplete"
          options={serviceOptions ? serviceOptions : []}
          value={selectedDepartement}
          onChange={handleDepartementChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      )}
    </Grid>
    <Grid container style={{marginTop:"4%"}} xs={12}>
              <FormLabel>
              Numéro de preuve (الرقم الاستدلالي)
              </FormLabel>
              <TextField
                variant="outlined"
                fullWidth
                value={preuveValue}
                onChange={handlePreuveInputChange}
            />
          </Grid>

          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }} style={{marginTop:"12%"}}>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="primary">
              Back
            </Button>
            <Button variant="solid" color="primary" onClick={handleSubmitFonc}>
              Valider
            </Button>
            </Box>
</StepContent>
</Step>

    </Stepper>
          </FormControl>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
      )}
    </Box>

    
  );
}