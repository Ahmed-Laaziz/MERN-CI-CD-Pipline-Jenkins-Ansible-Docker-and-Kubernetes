import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import jwt_decode from 'jwt-decode';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
const backLink = process.env.REACT_APP_BACK_LINK;

export default function ColumnPinningDynamicRowHeight({prof}) {

  const [showEditDelete, setShowEditDelete] = React.useState(true);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDateDe, setSelectedDateDe] = useState(null);
  const [selectedDateA, setSelectedDateA] = useState(null);
  const [description, setDescription] = useState(null);

 
  const navigate = useNavigate();

  function formatDate(inputDate) {
    const parts = inputDate.split('/');
    if (parts.length === 3) {
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
  
  const handleUpdateClick = async (demand) => {
    
    console.log(demand.professeur);
  try {
    if (demand != null){
      setSelectedDemand(demand); // Wait for setSelectedDemand to finish updating
      setSelectedDateDe(demand.de_date ? dayjs(formatDate(demand.de_date)) : null);
      setSelectedDateA(demand.a_date ? dayjs(formatDate(demand.a_date)) : null);
      setDescription(demand.description)
      setOpenModal(true);
    }
  } catch (error) {
    console.error('Error fetching agent data:', error);
  }
};

const handleCloseModal = () => {
  setOpenModal(false);
};
const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
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

// handleUpdateCongeClick
const handleUpdateCongeClick = (e) => {
  e.preventDefault();
  // Send updated congé demand data to the server
  const updatedData = {
    description:description,
    de_date: selectedDateDe,
    a_date: selectedDateA,
  };

  axios.put(backLink+`/demandeConge/update-demand-conge/${selectedDemand._id}`, updatedData)
    .then((response) => {
      // Handle successful update (e.g., show success message)
      console.log('Congé demand updated:', response.data);
      setOpenModal(false);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error updating congé demand:', error);
      // Handle error (e.g., show error message)
    });
};

const handleDateDeChange = (date) => {
  setSelectedDateDe(date);
};
const handleDateAChange = (date) => {
  setSelectedDateA(date);
};

  const columns = React.useMemo(
    () => [
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
      { field: 'updatedAt', headerName: 'Derniere modification',width: 210, type: 'Date', valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US');
      },editable: true },
      
      
      {
        field: 'actions',
        headerName: 'Actions',
        width: 210,
        renderCell: (params) => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
            {showEditDelete && (
              <React.Fragment>
                <Button 
                variant="outlined" 
                disabled={params.row.statut !== 'En attente'}
                onClick={() => {
                  // console.log(params.row.professeur); // Log the value of params.row
                  handleUpdateClick(params.row);
                }}
                size="small" startIcon={<EditIcon />}>
                  Modifier
                </Button>
                <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                  Supprimer
                </Button>
              </React.Fragment>
            )}
            {/* <Button
              variant="outlined"
              size="small"
              startIcon={<PrintIcon />}
              disabled={params.row.statut !== 'Approuvée'}
              onClick={() => handlePrintClick(params.row)}
            >
              Print
            </Button> */}
          </Stack>
        ),
      },
      
    ],
    // [showEditDelete],
  );

  const [demandes, setDemandes] = useState([]);
  function separateByCapitalLetters(str) {
    return str.replace(/^Demande/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  
  const fetchDemandes = async () => {
    try {
      const response = await axios.get(
        backLink+`/demandes/profDemandes/${prof._id}` // Replace with your actual API endpoint
      );

      const demandData = response.data
      // Attach professor names to demand objects
      const demandsWithProfessorNames = demandData.map((demand) => ({
        ...demand,
        __t: separateByCapitalLetters(demand.__t),
      }));
  
      setDemandes(demandsWithProfessorNames);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  useEffect(() => {
    fetchDemandes(); // Call the fetchTitle function when the component mounts
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* <Button sx={{ mb: 1 }} onClick={handleToggleClick}>
        Toggle edit & delete
      </Button> */}
      <div style={{ height: 600 }}>
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
        Modifier
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
      Modifier
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
              <Grid style={{marginTop:"4%"}} xs={6}>
                    <FormLabel>
                      De : min
                    </FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker 
                    fullWidth
                    id="fctdate"
                    value={selectedDateDe} // Pass the selectedDate as the value
                    onChange={handleDateDeChange} // Handle date selection
                    sx={{width:"100%"}}/>
                  </LocalizationProvider>
              </Grid>
              <Grid style={{marginTop:"4%"}} xs={6}>
                    <FormLabel>
                      A : ila
                    </FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker 
                    fullWidth
                    id="fctdate"
                    value={selectedDateA} // Pass the selectedDate as the value
                    onChange={handleDateAChange} // Handle date selection
                    sx={{width:"100%"}}/>
                  </LocalizationProvider>
              </Grid>
              </Grid>
              </FormControl>
              <FormControl>
                <FormLabel>Description : وصف</FormLabel>
                <Textarea 
                required 
                minRows={3}
                defaultValue={description}
                onChange={handleDescriptionChange}
                />
              </FormControl>
              <Stack direction="row" spacing={28}>
              <center>
  <Stack direction="row" spacing={28}>
    
    
    <Grid item xs={6}>
      <Button
        type="submit"
        onClick={handleUpdateCongeClick}
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
        Modifier
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

