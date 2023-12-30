import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
const fabStyle = {
    position: 'absolute',
    high: 10,
    right: 24,
  };
const backLink = process.env.REACT_APP_BACK_LINK
export default function ColumnPinningDynamicRowHeight({dep}) {
  const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState(null);
    const [agent, setAgent] = useState(null);
    const [professorNames, setProfessorNames] = useState({});

    function formatDateToDatetime(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    const currentDate = new Date(); // Create a Date object with the current date and time
    const currentDatetime = formatDateToDatetime(currentDate);

    const handlePreviewClick = async (demand) => {
        setSelectedDemand(demand); // Wait for setSelectedDemand to finish updating
        console.log(demand.professeur);
      try {
        console.log(demand.professeur);
        if (demand != null){
        const response = await axios.get(backLink + `/agent/agents/${demand.professeur._id}`);
        setAgent(response.data);
        console.log(agent);
        
        setOpenModal(true);
        }
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleApprouverClick = async (demand) => {
    setSelectedDemand(demand);
    if (selectedDemand) {
      try {
        const response = await axios.put(backLink+`/demandes/updateStatut/${selectedDemand._id}`, {
          statut: 'En Cours', // Set the new statut here
        });
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        console.log('Statut updated successfully:', response.data);

        // You can also close the modal or update the demand list after updating the statut.
        // For example:
        setOpenModal(false);
        fetchDemandes(); // Fetch updated demand list
      } catch (error) {
        console.error('Error updating statut:', error);
        // Handle the error appropriately (e.g., show an error message).
      }
    }
  };

  const handleValiderClick = async (demand) => {
    setSelectedDemand(demand);
      try {
        console.log("in handle valider");
        const response = await axios.put(backLink+`/demandes/updateStatut/${demand._id}`, {
          statut: 'Validée', // Set the new statut here
        });

        const res = await axios.post(backLink+'/notifs/add-notification', { "prof": demand.professeur , "title": demand.__t.replace(/([A-Z])/g, ' $1').trim()+" Accepté", "message": "Nous tenons à vous informer que votre "+demand.__t.replace(/([A-Z])/g, ' $1').trim()+" a été accepté et que vous pouvez le récupérer à l'administration. Merci !", "date": currentDatetime});
        console.log("accepted")
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        console.log('Statut updated successfully:', response.data);

        // You can also close the modal or update the demand list after updating the statut.
        // For example:
        setOpenModal(false);
        fetchDemandes(); // Fetch updated demand list
      } catch (error) {
        console.error('Error updating statut:', error);
        // Handle the error appropriately (e.g., show an error message).
      }
    
  };


  const handleRejeterClick = async (demand) => {
    setSelectedDemand(demand);
      try {
        console.log("in handle valider");
        const response = await axios.put(backLink+`/demandes/updateStatut/${selectedDemand._id}`, {
          statut: 'Rejetée', // Set the new statut here
        });

        const res = await axios.post(backLink+'/notifs/add-notification', { "prof": selectedDemand.professeur , "title": selectedDemand.__t.replace(/([A-Z])/g, ' $1').trim()+" Refusé", "message": "Nous tenons à vous informer que votre demande "+selectedDemand.__t.replace(/([A-Z])/g, ' $1').trim()+" a été refusé. Merci !", "date": currentDatetime});
        console.log("rejected")
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        console.log('Statut updated successfully:', response.data);

        // You can also close the modal or update the demand list after updating the statut.
        // For example:
        setOpenModal(false);
        fetchDemandes(); // Fetch updated demand list
      } catch (error) {
        console.error('Error updating statut:', error);
        // Handle the error appropriately (e.g., show an error message).
      }
    
  };

  const handleFabClick = () => {
    // Use the navigate function to navigate to another page
    navigate('/demands-history'); // Replace '/your-page' with the actual route you want to navigate to
  };
  

  const columns = React.useMemo(
    () => [
      {
        field: 'professorName',
        headerName: 'Professeur',
        width: 210,
      },
      { field: '__t', headerName: 'Type', width: 210, editable: false },
      {
        field: 'statut',
        headerName: 'Statut',
        width: 210,
        renderCell: (params) => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
             {/* Display the value of the 'statut' field */}
            <React.Fragment>
              <Button
              size="small"
              sx={{
                borderRadius: 28,
                borderColor: (() => {
                  switch (params.value) {
                    case 'En attente':
                      return 'orange';
                    case 'En Cours':
                      return 'blue';
                    case 'Validée':
                      return 'green';
                    case 'Rejetée':
                      return 'red';
                    default:
                      return 'orange'; // Default color (you can change this)
                  }
                })(),
                color: (() => {
                  switch (params.value) {
                    case 'En attente':
                      return 'orange';
                    case 'En Cours':
                      return 'blue';
                    case 'Validée':
                      return 'green';
                    case 'Rejetée':
                      return 'red';
                    default:
                      return 'orange'; // Default color (you can change this)
                  }
                })(),
                }}
                variant="outlined"
              >
                {params.value} {/* Add your button content here */}
              </Button>
            </React.Fragment>
          </Stack>
        ),
      },
      { field: 'createdAt', headerName: 'Date Demande', width: 210, type: 'Date',valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US');
      },editable: false },
      // { field: 'updatedAt', headerName: 'Derniere modification',width: 210, type: 'Date', editable: true },
      
      
      {
        field: 'actions',
        headerName: 'Actions',
        width: 210,
        renderCell: (params) => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RemoveRedEyeIcon />}
              onClick={() => {
                // console.log(params.row.professeur); // Log the value of params.row
                handlePreviewClick(params.row);
              }}
            >
              Détails
            </Button>
          </Stack>
        ),
        
      },
      
    ],
    // [showEditDelete],
  );

  const [demandes, setDemandes] = useState([]);
  // Function to add spaces before capital letters
  function separateByCapitalLetters(str) {
    // Remove "Demande" from the beginning of the string and then separate the remaining text by capital letters
    return str.replace(/^Demande/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  
  const fetchDemandes = async () => {
    try {
      if (dep == "TRI"){
      const response = await axios.get(backLink + `/demandes/chefDemands`);
      const demandData = response.data;
      const demandsWithProfessorNames = [];
      
      for (const demand of demandData) {
        try {
          if (demand.professeur && demand.professeur.departement === dep) {
            
            const professorResponse = await axios.get(backLink + `/agent/agents/${demand.professeur._id}`);
            const professor = professorResponse.data;
            
            demandsWithProfessorNames.push({
              ...demand,
              professorName: `${professor.nom.split('|')[0]} ${professor.prenom.split('|')[0]}`,
              department: professor.departement,
              __t: separateByCapitalLetters(demand.__t)
            });
          }
        } catch (error) {
          console.error('Error fetching professor name:', error);
        }
      }
  
      setDemandes(demandsWithProfessorNames);
      }
      else if (dep =="CP"){
        const response = await axios.get(backLink + `/demandes/chefDemandsCP`);
        const demandData = response.data;
        const demandsWithProfessorNames = [];
      
      for (const demand of demandData) {
        try {
          if (demand.professeur && demand.professeur.departement === dep) {
            
            const professorResponse = await axios.get(backLink + `/agent/agents/${demand.professeur._id}`);
            const professor = professorResponse.data;
            
            demandsWithProfessorNames.push({
              ...demand,
              professorName: `${professor.nom.split('|')[0]} ${professor.prenom.split('|')[0]}`,
              department: professor.departement,
              __t: separateByCapitalLetters(demand.__t)
            });
          }
        } catch (error) {
          console.error('Error fetching professor name:', error);
        }
      }
  
      setDemandes(demandsWithProfessorNames);
      }
      // const demandData = response.data;
  
      
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };
  
  useEffect(() => {
    fetchDemandes();
  }, []);
  

  return (
    <div style={{ width: '100%' }}>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleFabClick} title="Click to view history">
      <HistoryIcon />
    </Fab>
      <div style={{ height: 500 }}>
        <DataGrid
          rows={demandes}
          columns={columns}
          getRowId={(row) => row._id}
          getRowHeight={() => 'auto'}
          initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
        />
      </div>
      

{openModal ? (
    <Modal open={openModal} onClose={handleCloseModal}>
        { (selectedDemand.__t === 'Quitter Territoire') ? (
            <ModalDialog>
            <DialogTitle>  الإذن بمغادرة التراب الوطني
  </DialogTitle>
            <DialogContent>Autorisation de quitter le territoire</DialogContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpenModal(false);
              }}
            >
              <Stack spacing={2}>
              <FormControl>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                  <FormLabel>Demandeur :</FormLabel>
                  <Input autoFocus required defaultValue={agent.prenom.split('|')[0] + " " + agent.nom.split('|')[0]} disabled/>
                </Grid>
                <Grid item xs={6} >
                  <FormLabel>مقدم الطلب :</FormLabel>
                  <Input autoFocus required defaultValue={agent.prenom.split('|')[1] + " " + agent.nom.split('|')[1]} disabled/>
                </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop:"2%"}}>
                <Grid item xs={6} >
                  <FormLabel>De : من</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.de_date} disabled/>
                </Grid>
                <Grid item xs={6} >
                  <FormLabel>À : الى</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.a_date} disabled/>
                </Grid>
                </Grid>
                <Grid item xs={12} >
                  <FormLabel>Université : جامعة</FormLabel>
                  <Input autoFocus required defaultValue={selectedDemand.universite} disabled/>
                </Grid>
                </FormControl>
                <FormControl>
                  <FormLabel>Description : وصف</FormLabel>
                  <Textarea 
                  required 
                  minRows={3}
                  defaultValue={selectedDemand.description}
                  disabled
                  />
                </FormControl>
                
                
                
                
                <center>
  <Stack direction="row" spacing={28}>
    
    
    <Grid item xs={6}>
      <Button
        type="submit"
        onClick={handleRejeterClick}
        sx={{
          backgroundColor: "#A93226",
          color: "white",
          '&:hover': {
            backgroundColor: '#80271E',
          },
          // Add margin to create space between the buttons
          margin: '0 10px',
        }}
      >
        Refuser
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        type="submit"
        onClick={handleApprouverClick}
        sx={{
          backgroundColor: "#2980B6",
          color: "white",
          '&:hover': {
            backgroundColor: '#1D597E',
          },
          // Add margin to create space between the buttons
          margin: '0 10px',
        }}
      >
        Approuver
      </Button>
    </Grid>
  </Stack>
</center>

               
                
              </Stack>
            </form>
          </ModalDialog>
        ):(selectedDemand.__t === 'Ordre Mission') ? (
          <ModalDialog>
          <DialogTitle>     تكليف بمهمة
</DialogTitle>
          <DialogContent>Ordre de mission</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenModal(false);
            }}
          >
            <Stack spacing={2}>
            <FormControl>
            <Grid container spacing={2} style={{marginTop:"2%"}}>
            <Grid item xs={6} >
                <FormLabel>Demandeur :</FormLabel>
                <Input autoFocus required defaultValue={agent.prenom.split('|')[0] + " " + agent.nom.split('|')[0]} disabled/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>مقدم الطلب :</FormLabel>
                <Input autoFocus required defaultValue={agent.prenom.split('|')[1] + " " + agent.nom.split('|')[1]} disabled/>
              </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>De : من</FormLabel>
                <Input autoFocus required defaultValue={selectedDemand.de_date} disabled/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>À : الى</FormLabel>
                <Input autoFocus required defaultValue={selectedDemand.a_date} disabled/>
              </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>mission à : مهمة في</FormLabel>
                <Input autoFocus required defaultValue={selectedDemand.mission_a} disabled/>
              </Grid>
              <Grid item xs={6} >
              <FormLabel>Moyen de transport : وسيلة النقل</FormLabel>
                <Input autoFocus required defaultValue={selectedDemand.moyen_transport} disabled/>
              </Grid>
              </Grid>
              </FormControl>
              <FormControl>
                <FormLabel>Description : وصف</FormLabel>
                <Textarea 
                required 
                minRows={3}
                defaultValue={selectedDemand.description}
                disabled
                />
              </FormControl>
              
              
              
              
              <center>
<Stack direction="row" spacing={28}>
  
  
  <Grid item xs={6}>
    <Button
      type="submit"
      onClick={handleRejeterClick}
      sx={{
        backgroundColor: "#A93226",
        color: "white",
        '&:hover': {
          backgroundColor: '#80271E',
        },
        // Add margin to create space between the buttons
        margin: '0 10px',
      }}
    >
      Refuser
    </Button>
  </Grid>
  <Grid item xs={6}>
    <Button
      type="submit"
      onClick={handleApprouverClick}
      sx={{
        backgroundColor: "#2980B6",
        color: "white",
        '&:hover': {
          backgroundColor: '#1D597E',
        },
        // Add margin to create space between the buttons
        margin: '0 10px',
      }}
    >
      Approuver
    </Button>
  </Grid>
</Stack>
</center>

             
              
            </Stack>
          </form>
        </ModalDialog>
      ):(selectedDemand.__t === 'Conge')?(
          <ModalDialog>
          <DialogTitle>  إجازة إدارية
</DialogTitle>
          <DialogContent>Décision de congé administratif</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenModal(false);
            }}
          >
            <Stack spacing={2}>
            <FormControl>
            <Grid container spacing={2} style={{marginTop:"2%"}}>
            <Grid item xs={6} >
                <FormLabel>Demandeur :</FormLabel>
                <Input autoFocus required defaultValue={agent.prenom.split('|')[0] + " " + agent.nom.split('|')[0]} disabled/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>مقدم الطلب :</FormLabel>
                <Input autoFocus required defaultValue={agent.prenom.split('|')[1] + " " + agent.nom.split('|')[1]} disabled/>
              </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop:"2%"}}>
              <Grid item xs={6} >
                <FormLabel>De : من</FormLabel>
                <Input autoFocus required defaultValue={selectedDemand.de_date} disabled/>
              </Grid>
              <Grid item xs={6} >
                <FormLabel>À : الى</FormLabel>
                <Input autoFocus required defaultValue={selectedDemand.a_date} disabled/>
              </Grid>
              </Grid>
              </FormControl>
              <FormControl>
                <FormLabel>Description : وصف</FormLabel>
                <Textarea 
                required 
                minRows={3}
                defaultValue={selectedDemand.description}
                disabled
                />
              </FormControl>
              <Stack direction="row" spacing={28}>
              <center>
  <Stack direction="row" spacing={28}>
    
    
    <Grid item xs={6}>
      <Button
        type="submit"
        onClick={handleRejeterClick}
        sx={{
          backgroundColor: "#A93226",
          color: "white",
          '&:hover': {
            backgroundColor: '#80271E',
          },
          // Add margin to create space between the buttons
          margin: '0 10px',
        }}
      >
        Refuser
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        type="submit"
        onClick={handleApprouverClick}
        sx={{
          backgroundColor: "#2980B6",
          color: "white",
          '&:hover': {
            backgroundColor: '#1D597E',
          },
          // Add margin to create space between the buttons
          margin: '0 10px',
        }}
      >
        Approuver
      </Button>
    </Grid>
  </Stack>
</center>
              </Stack>
            </Stack>
          </form>
        </ModalDialog>
      ):<></>}
        
      </Modal>
):<></>}
      
    </div>
  );
}

