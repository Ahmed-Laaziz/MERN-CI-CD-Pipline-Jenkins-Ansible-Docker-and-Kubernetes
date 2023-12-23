import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/joy/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const backLink = process.env.REACT_APP_BACK_LINK;

export default function FAQCard({prof}) {
  const navigate = useNavigate();
    const [selectedUniversity, setSelectedUniversity] = React.useState(null);
    
  const handleUniversityChange = (event, newValue) => {
    setSelectedUniversity(newValue);
  };

  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedProfId, setSelectedProfId] = useState('');


  const handleAutocompleteChange = (event, newValue) => {
    setSelectedProfessor(newValue);
    if (newValue) {
      // Store the ID of the selected professor
      const professorId = newValue._id;
      setSelectedProfId(professorId); // Update selectedProfId state with the professor's ID
    }
  };


  // Array of university objects with real names from Morocco and France
  const universities = [
    { label: 'Université de Paris', country: 'France' },
    { label: 'Sorbonne Université', country: 'France' },
    { label: 'École Polytechnique', country: 'France' },
    { label: 'Paris-Sud University', country: 'France' },
    { label: 'Université de Aix-Marseille', country: 'France' },
    { label: 'Université de Lyon', country: 'France' },
    { label: 'Université de Lille', country: 'France' },
    { label: 'Université de Toulouse', country: 'France' },
    { label: 'Université de Bordeaux', country: 'France' },
    { label: 'Université de Montpellier', country: 'France' },
    { label: 'Université de Nice Sophia Antipolis', country: 'France' },
    { label: 'Université de Nantes', country: 'France' },
    { label: 'Université de Grenoble', country: 'France' },
    { label: 'Université de Rennes', country: 'France' },
    { label: 'Université de Poitiers', country: 'France' },
    { label: 'Université de Rouen', country: 'France' },
    { label: 'Université de Orleans', country: 'France' },
    { label: 'Université de Avignon', country: 'France' },
    // Add more universities here
  ];
  const [selectedOption, setSelectedOption] = React.useState('att1'); // Initial selected option
  const [openAtt1, setOpenAtt1] = React.useState(false);
  const [openAtt2, setOpenAtt2] = React.useState(false);
  const [openAtt3, setOpenAtt3] = React.useState(false);
  const [openAtt4, setOpenAtt4] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [descriptionConge, setDescriptionConge] = React.useState('');
  const [descriptionAttestationTravail, setDescriptionAttestationTravail] = React.useState('');
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedDateConge1, setSelectedDateConge1] = useState(null);
  const [selectedDateConge2, setSelectedDateConge2] = useState(null);
  // Function to handle date selection
  const handleDate1Change = (date) => {
    setSelectedDate1(date);
  };
  const handleDate2Change = (date) => {
    setSelectedDate2(date);
  };
  const handleDateConge1Change = (date) => {
    setSelectedDateConge1(date);
  };
  const handleDateConge2Change = (date) => {
    setSelectedDateConge2(date);
  };
  //Choose option for demande
  const handleChange = (event, newValue) => {
    setSelectedOption(newValue)
  };
  
const handleValidate = () => {
  if(selectedOption==='att1'){
    // console.log("in att1")
    // navigate('/attestationTravail', { state: {input1:prof.prenom.split('|')[0] , input2:prof.nom.split('|')[0], input3:'Grade B', input4:prof.num_loyer, input5:prof.date_entre_ecole}})
    setOpenAtt1(true);
}
    else if(selectedOption==='att2'){
        setOpenAtt2(true);
    }
    else if(selectedOption==='att3'){
        setOpenAtt3(true);
    }
    else if(selectedOption==='att4'){
        setOpenAtt4(true);
    }
}
const handleDescriptionChange = (event) => {
  setDescription(event.target.value);
};
const handleDescriptionCongeChange = (event) => {
  setDescriptionConge(event.target.value);
};
const handleDescriptionAttestationTravailChange = (event) => {
  setDescriptionAttestationTravail(event.target.value);
};

const addDemande1 = async () => {
  try {
    // Show the spinner while the backend request is in progress
    // setIsLoading(true);
    const url = backLink+"/demandeAttestationTravail/add-demande-attestation-travail"; // URL for the backend API
    const requestData = {
      professeur: selectedProfId, // Send the user input as a parameter in the request body
      description: descriptionAttestationTravail
    };

    // Make a POST request to your backend API
    const response = await axios.post(url, requestData);
    navigate('/admin-demandes')
  } catch (error) {
    console.error("Error fetching abstract:", error);
  } finally {
    // Hide the spinner after the backend request is completed
    // setIsLoading(false);
  }
};


const addDemande2 = async () => {
  try {
    // Show the spinner while the backend request is in progress
    // setIsLoading(true);
    const url = backLink+"/demande/add-demande-quitter-territoire"; // URL for the backend API
    const requestData = {
      professeur: selectedProfId, // Send the user input as a parameter in the request body
      description: description,
      de_date: selectedDate1,
      a_date: selectedDate2,
      universite: selectedUniversity.label,
    };

    // Make a POST request to your backend API
    const response = await axios.post(url, requestData);
    navigate('/admin-demandes')
  } catch (error) {
    console.error("Error fetching abstract:", error);
  } finally {
    // Hide the spinner after the backend request is completed
    // setIsLoading(false);
  }
};


const addDemande3 = async () => {
  try {
    // Show the spinner while the backend request is in progress
    // setIsLoading(true);
    const url = backLink+"/demandeConge/add-demande-conge"; // URL for the backend API
    const requestData = {
      professeur: selectedProfId, // Send the user input as a parameter in the request body
      description: descriptionConge,
      de_date: selectedDateConge1,
      a_date: selectedDateConge2,
    };

    // Make a POST request to your backend API
    const response = await axios.post(url, requestData);
    navigate('/admin-demandes')
  } catch (error) {
    console.error("Error fetching abstract:", error);
  } finally {
    // Hide the spinner after the backend request is completed
    // setIsLoading(false);
  }
};


useEffect(() => {
    async function fetchProfessors() {
      try {
        const response = await axios.get(backLink+'/prof/professeurs');
        setProfessors(response.data); // Assuming response.data is an array of professors with names and IDs
      } catch (error) {
        console.error('Error fetching professors:', error);
        // Handle error or display error message
      }
    }

    fetchProfessors();
  }, []);
  return (
    <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        textAlign: 'center',
        maxWidth: '100%',
        width: '90%',
        height: '90%',
        overflow: 'auto',
      }}
    >
      <CardOverflow
        variant="solid"
        color="primary"
        sx={{
          flex: '0 0 300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 'var(--Card-padding)',
        }}
      >
        <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
          Demandes
        </Typography>
        <Typography textColor="primary.200">
          Espace demandes administratives pour les professeurs de l'ENSAJ.
        </Typography>
      </CardOverflow>
      <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={5}>
            <img
              src="https://cdn-07.9rayti.com/rsrc/cache/widen_750/uploads/2014/06/ENSA-El-Jadida-concours-dacc%C3%A8s-%C3%A0-la-1%C3%A8re-ann%C3%A9e-du-Cycle-dIng%C3%A9nieur-2014.jpg"
              width="65%"
              height="60%"
            />
          </Grid>
          <Grid xs={2}>
            <></>
          </Grid>
          <Grid xs={5}>
            <img
              src="https://www.enssup.gov.ma/storage/settings/October2021/TxyjqNRZ4NmJv8XIlkg4.png"
              width="75%"
              height="60%"
            />
          </Grid>
        </Grid>
        <AspectRatio ratio="19/4" objectFit="contain" variant="plain">
          <img
            alt=""
            src="https://cdn.dribbble.com/users/1874602/screenshots/5647628/send-icon.gif"
          />
        </AspectRatio>
        <CardContent>
          <Typography level="title-lg">
            Avez vous besoin d'un document administratif?
          </Typography>
          <Typography fontSize="sm" sx={{ mt: 0.5 }}>
            Choisissez votre document de besoin et remplire le formulaire avec les données appropriées
          </Typography>



          {/* <Select value={selectedProfId} onChange={handleSelectChange}>
            <MenuItem>Selectionner un professeur</MenuItem>
            {professors.map((prof) => (
                <MenuItem  value={prof._id}>
                {`${prof.prenom.split('|')[0]} ${prof.nom.split('|')[0]} | ${prof.prenom.split('|')[1]} ${prof.nom.split('|')[1]}`}
                </MenuItem>
            ))}
            </Select> */}

<FormControl fullWidth>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <InputLabel htmlFor="professor-select"><b>Selectionner un professeur:</b></InputLabel>
        </Grid>
        <Grid item xs={8}>
          <Autocomplete
            id="professor-select"
            options={professors}
            getOptionLabel={(professor) =>
              professor ? `${professor.prenom.split('|')[0]} ${professor.nom.split('|')[0]} | ${professor.prenom.split('|')[1]} ${professor.nom.split('|')[1]}` : ''
            }
            value={selectedProfessor}
            onChange={handleAutocompleteChange} // Use the custom handler for Autocomplete change
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Search professors"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </FormControl>



<FormControl fullWidth>
  <Grid container alignItems="center">
    <Grid item xs={4}>
      <InputLabel htmlFor="select-label"><b>Selectionner un document:</b></InputLabel>
    </Grid>
    <Grid item xs={8}>
    <Select defaultValue="att1" onChange={handleChange} disabled={!selectedProfessor}>
  <Option value="att1">Attestation de travail - شهادة عمل</Option>
  <Option value="att2">Autorisation de quitter le territoire - الإذن بمغادرة التراب الوطني</Option>
  <Option value="att3">Décision de congé administratif - إجازة إدارية</Option>
  <Option value="att4">Attestation de reprise de travail - شهادةاستئناف العمل</Option>
</Select>
    </Grid>
  </Grid>
</FormControl>
<Button
  variant="outlined"
  color="primary"
  onClick={handleValidate}
  disabled={!selectedProfessor}
  sx={{
    '--variant-borderWidth': '2px',
    borderRadius: 40,
    borderColor: 'primary.500',
    mx: 'auto',
  }}
>
  {/* {selectedOption === 'att1' ? 'Imprimer' : 'Valider'} */}
  Valider
</Button>

<Modal open={openAtt2} onClose={() => setOpenAtt2(false)}>
        <ModalDialog>
          <DialogTitle> الإذن بمغادرة التراب الوطني</DialogTitle>
          <DialogContent>Autorisation de quitter le territoire</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenAtt2(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>De : من</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                required
                value={selectedDate1} // Pass the selectedDate as the value
                onChange={handleDate1Change} // Handle date selection
                // sx={{width:"100%"}}
                />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>À : الى</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                value={selectedDate2} // Pass the selectedDate as the value
                onChange={handleDate2Change} // Handle date selection
                // sx={{width:"100%"}}
                />
              </LocalizationProvider>
              </Grid>
              </Grid>
              </FormControl>
              <FormControl>
                <FormLabel>Université : جامعة</FormLabel>
              <Autocomplete
      options={universities}
      getOptionLabel={(option) => option.label}
      required
      value={selectedUniversity}
      onChange={handleUniversityChange}
      renderInput={(params) => <TextField {...params} label="Select University" variant="outlined" />}
    />
    </FormControl>
              <FormControl>
                <FormLabel>Description : وصف</FormLabel>
                <Textarea 
                required 
                minRows={3}
                value={description} // Bind the value to the description state
                onChange={handleDescriptionChange}
                />
              </FormControl>
              <Button type="submit" onClick={addDemande2}>Valider</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Modal open={openAtt1} onClose={() => setOpenAtt3(false)}>
        <ModalDialog>
          <DialogTitle>شهادة عمل</DialogTitle>
          <DialogContent>Attestation de travail</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenAtt2(false);
            }}
          >
             <FormControl>
                <FormLabel>Description : وصف</FormLabel>
                <Textarea 
                required 
                minRows={5}
                width="150%"
                value={descriptionAttestationTravail} // Bind the value to the description state
                onChange={handleDescriptionAttestationTravailChange}
                />
              </FormControl>
              <Grid>
                &nbsp;
              </Grid>
            <Stack spacing={2}>
              <Button type="submit" onClick={addDemande1}>Valider</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>



      <Modal open={openAtt3} onClose={() => setOpenAtt3(false)}>
        <ModalDialog>
          <DialogTitle>إجازة إدارية
</DialogTitle>
          <DialogContent>Décision de congé administratif</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenAtt2(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>De : من</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                value={selectedDateConge1} // Pass the selectedDate as the value
                onChange={handleDateConge1Change} // Handle date selection
                // sx={{width:"100%"}}
                />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>À : الى</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                value={selectedDateConge2} // Pass the selectedDate as the value
                onChange={handleDateConge2Change} // Handle date selection
                // sx={{width:"100%"}}
                />
              </LocalizationProvider>
              </Grid>
              </Grid>
              </FormControl>
              <FormControl>
                <FormLabel>Description : وصف</FormLabel>
                <Textarea 
                required 
                minRows={3}
                value={descriptionConge} // Bind the value to the description state
                onChange={handleDescriptionCongeChange}
                />
              </FormControl>
              <Button type="submit" onClick={addDemande3}>Valider</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>



      <Modal open={openAtt4} onClose={() => setOpenAtt4(false)}>
        <ModalDialog>
          <DialogTitle> شهادةاستئناف العمل
</DialogTitle>
          <DialogContent>Attestation de reprise de travail</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenAtt2(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>Date d'absence : تاريخ التغيب</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                // value={selectedDateVisa} // Pass the selectedDate as the value
                // onChange={handleDateVisaChange} // Handle date selection
                // sx={{width:"100%"}}
                />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>Date reprise : تاريخ الالتحاق</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                // value={selectedDateVisa} // Pass the selectedDate as the value
                // onChange={handleDateVisaChange} // Handle date selection
                // sx={{width:"100%"}}
                />
              </LocalizationProvider>
              </Grid>
              </Grid>
              <FormControl>
              <FormLabel>Numéro financier - الرقم المالي</FormLabel>
                <Input autoFocus required />
              </FormControl>
              </FormControl>
              <FormControl>
                <FormLabel>Raison - سببه</FormLabel>
                <Textarea required minRows={3}/>
              </FormControl>
              <Button type="submit">Valider</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

        </CardContent>
      </CardContent>
    </Card>



  );
}
