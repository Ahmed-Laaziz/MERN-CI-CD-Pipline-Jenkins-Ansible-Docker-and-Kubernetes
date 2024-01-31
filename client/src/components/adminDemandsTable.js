import React, { useEffect, useState } from 'react';
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
  
// const backLink = "https://grh-ensaj-backend.adaptable.app"
const backLink = process.env.REACT_APP_BACK_LINK
export default function ColumnPinningDynamicRowHeight() {
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
    setSelectedDemand(demand);
    console.log("demand id : " + demand._id);
    try {
      if (demand.chef){
        const response = await axios.get(backLink+`/agent/agents/${demand.chef}`);
        setAgent(response.data);
      }
      else if (demand.professeur){
        const response = await axios.get(backLink+`/agent/agents/${demand.professeur}`);
        setAgent(response.data);
      }
        
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  function getRandomNumber() {
    // Generate a random number between 0 (inclusive) and 1 (exclusive)
    const randomFraction = Math.random();

    // Scale and shift the random number to the range [1, 50]
    const randomNumber = Math.floor(randomFraction * 50) + 1;

    return randomNumber;
}

const fetchHist = async (agentId) => {
  console.log(agentId)
  try {
    const response = await axios.post(
      backLink+`/hist/prof-hist`, {"prof": agentId} // Replace with your actual API endpoint
    );
    // setHistoriques(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching title:', error);
  }
};

  const handleApprouverClick = async (demand) => {
    setSelectedDemand(demand);
    if (selectedDemand) {
      try {
        if (selectedDemand.statut != 'En Cours'){
        const response = await axios.put(backLink+`/demandes/updateStatut/${selectedDemand._id}`, {
          statut: 'En Cours', // Set the new statut here
        });
      }
          if (selectedDemand.__t === 'Quitter Territoire'){
           navigate('/autorisationQuitterTerritoire', { state: {input1:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input2:`${agent.cadre}` , input3:`${selectedDemand.de_date}`, input4:`${selectedDemand.a_date}`, input5:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input6:`${agent.cadre}`, input7:`${selectedDemand.universite}`}})
          }
          else if (selectedDemand.__t === 'Quitter Territoire_'){
            navigate('/autorisationQuitterTerritoire', { state: {input1:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input2:"Maitre de conférences habilité" , input3:`${selectedDemand.de_date}`, input4:`${selectedDemand.a_date}`, input5:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input6:"Maitre de conférences habilité", input7:`${selectedDemand.universite}`}})
           }
          else if (selectedDemand.__t === 'Conge')
           {
             navigate('/decisionConge', { state: {input1:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input2:`${agent.cadre}` , input3:`${selectedDemand.de_date}`, input4:`${selectedDemand.a_date}`, input5:`${selectedDemand.doti}`, input6:`${agent.cadre}`,}})
           }
           else if (selectedDemand.__t === 'Conge_')
           {
             navigate('/decisionConge', { state: {input1:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input2:"Maitre de conférences habilité" , input3:`${selectedDemand.de_date}`, input4:`${selectedDemand.a_date}`, input5:`${selectedDemand.doti}`, input6:"Maitre de conférences habilité",}})
           }
           else if (selectedDemand.__t == 'Attestation Travail')
           {
            const myData = await fetchHist(agent._id);
            console.log(myData[0].cadre);
            navigate('/attestationTravail', { state: {input1:agent.prenom.split('|')[0] , input2:agent.nom.split('|')[0], input3:`${agent.cadre} - ${myData[0].grade}`, input4:agent.num_loyer, input5:agent.date_entre_ecole}})
           }
           else if (selectedDemand.__t == 'Attestation Travail_')
           {
            navigate('/attestationTravail', { state: {input1:agent.prenom.split('|')[0] , input2:agent.nom.split('|')[0], input3:"Maitre de conférences habilité", input4:"89732", input5:"2024-01-02"}})
           }
           else if (selectedDemand.__t == 'Ordre Mission')
           {
            const randomNbr = getRandomNumber();
            navigate('/ordreMission', { state: {input1:`${randomNbr}/2025` , input5:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input2:`${selectedDemand.moyen_transport}`, input3:`${selectedDemand.de_date}`, input4:`${selectedDemand.a_date}`, input6:`${selectedDemand.mission_a}`, input7:`${selectedDemand.description}`}})
           }
           else if (selectedDemand.__t == 'Ordre Mission_')
           {
            const randomNbr = getRandomNumber();
            navigate('/ordreMission', { state: {input1:`${randomNbr}/2025` , input5:`${agent.prenom.split('|')[0]} ${agent.nom.split('|')[0]}`, input2:`${selectedDemand.moyen_transport}`, input3:`${selectedDemand.de_date}`, input4:`${selectedDemand.a_date}`, input6:`${selectedDemand.mission_a}`, input7:`${selectedDemand.description}`}})
           }
         
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        // console.log('Statut updated successfully:', response.data);

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
        if (demand.professeur){
        console.log("in handle valider");
        const response = await axios.put(backLink+`/demandes/updateStatut/${demand._id}`, {
          statut: 'Validée', // Set the new statut here
        });
        const res = await axios.post(backLink+'/notifs/add-notification', { "prof": demand.professeur , "title": demand.__t.replace(/([A-Z])/g, ' $1').trim()+" Accepté", "message": "Nous tenons à vous informer que votre demande "+demand.__t.replace(/([A-Z])/g, ' $1').trim()+" a été accepté et que vous pouvez le récupérer à l'administration. Merci !", "date": currentDatetime});
        console.log('Statut updated successfully:', response.data);
      }
      else{
        const response = await axios.put(backLink+`/chef-demands/updateStatut/${demand._id}`, {
          statut: 'Validée', // Set the new statut here
        });
        console.log('Statut updated successfully:', response.data);
      }
        console.log("accepted")
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        

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
        if (demand.professeur){
        const response = await axios.put(backLink+`/demandes/updateStatut/${demand._id}`, {
          statut: 'Rejetée', // Set the new statut here
        });
        const res = await axios.post(backLink+'/notifs/add-notification', { "prof": demand.professeur , "title": demand.__t.replace(/([A-Z])/g, ' $1').trim()+" Refusé", "message": "Nous tenons à vous informer que votre demande "+demand.__t.replace(/([A-Z])/g, ' $1').trim()+" a été refusé. Merci !", "date": currentDatetime});
        console.log('Statut updated successfully:', response.data);
      }
      else{
        const response = await axios.put(backLink+`/chef-demands/updateStatut/${demand._id}`, {
          statut: 'Rejetée', // Set the new statut here
        });
        console.log('Statut updated successfully:', response.data);
      }
        console.log("rejected")
        // Handle the response as needed (e.g., update UI, show a notification, etc.)
        

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
      // {
      //   field: 'professorName',
      //   headerName: 'Fonctionnaires',

      //   width: 250,
      // },
      { field: '__t', headerName: 'Type', width: 290, editable: false },
      {
        field: 'statut',
        headerName: 'Statut',
        width: 200,
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
      { field: 'createdAt', headerName: 'Date Demande', width: 250,align: 'center', type: 'Date',valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US');
      },editable: false },
      { field: 'updatedAt', headerName: 'Dernière modification',width: 250, type: 'Date', valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US');
      },editable: true },
      // { field: 'updatedAt', headerName: 'Derniere modification',width: 210, type: 'Date', editable: true },
      
      
      {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
          <Stack spacing={1} sx={{ width: 1, py: 1 }}>
            
            <Button
              variant="outlined"
              size="small"
              startIcon={<RemoveRedEyeIcon />}
              disabled={(params.row.__t == 'Quitter Territoire' || params.row.__t == 'Conge' || params.row.__t == 'Ordre Mission') && params.row.statut == 'En attente'}
            //   onClick={() => handlePrintClick(params.row)}
            onClick={() => handlePreviewClick(params.row)}
            >
              Détails
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<DoneIcon />}
              disabled={params.row.statut !== 'En Cours'}
            //   onClick={() => handlePrintClick(params.row)}
            onClick={() => handleValiderClick(params.row)}
            >
              Valider
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<CloseIcon />}
              disabled={params.row.statut !== 'En Cours' || (params.row.__t == 'Quitter Territoire' && params.row.statut !== 'En attente')}
            //   onClick={() => handlePrintClick(params.row)}
            onClick={() => handleRejeterClick(params.row)}
            >
              Rejeter
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
      const response1 = await axios.get(backLink + `/demandes/enAttenteDemands`);
    const demandData1 = response1.data;

    // Fetch demands from the second endpoint
    const response2 = await axios.get(backLink + '/chef-demands/enAttenteDemands');
    const demandData2 = response2.data;
    console.log(demandData2);

    // Concatenate demands from both endpoints
    const allDemandData = [...demandData1, ...demandData2];
      
      const professorNames = {};
      
      // for (const demand of demandData) {
      //   try {
      //     const professorResponse = await axios.get(backLink+`/agent/agents/${demand.professeur}`);
      //     professorNames[demand.professeur] = professorResponse.data.nom.split('|')[0] + " " + professorResponse.data.prenom.split('|')[0]; // Replace 'nom' with the actual professor name field
      //   } catch (error) {
      //     console.error('Error fetching professor name:', error);
      //   }
      // }
      
  
      // Attach professor names to demand objects
      const demandsWithProfessorNames = allDemandData.map((demand) => ({
        ...demand,
        professorName: professorNames[demand.professeur] || 'N/A', // Provide a default value if name not found
        __t: separateByCapitalLetters(demand.__t),
      }));
      
      setDemandes(demandsWithProfessorNames);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };
  
  useEffect(() => {
    // Fetch the title from the backend API

    fetchDemandes(); // Call the fetchTitle function when the component mounts
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleFabClick} title="Click to view history">
      <HistoryIcon />
    </Fab>
      <div style={{ height: 600 }}>
        <DataGrid
          rows={demandes}
          columns={columns}
          getRowId={(row) => row._id}
          getRowHeight={() => 'auto'}
          sortModel={[
            {
              field: 'createdAt',
              sort: 'desc',  // 'desc' for descending order, 'asc' for ascending order
            },
          ]}
          initialState={{ 
            pinnedColumns: { left: ['name'], right: ['actions'] },
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}

        />
      </div>
      

{openModal ? (
    <Modal open={openModal} onClose={handleCloseModal}>
        { (selectedDemand.__t === 'Quitter Territoire' || selectedDemand.__t === 'Quitter Territoire_') ? (
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
                <Grid item xs={1}>
                <Button type="submit" onClick={handleApprouverClick} sx={{backgroundColor:"#000080", color:"white",  '&:hover': {
            backgroundColor: '#0000FF ', // Change text color on hover
          },}}>Imprimer</Button>
                </Grid>
                </center>
               
                
              </Stack>
            </form>
          </ModalDialog>
        ):(selectedDemand.__t === 'Ordre Mission' || selectedDemand.__t === 'Ordre Mission_') ? (
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
                <Grid item xs={1}>
                <Button type="submit" onClick={handleApprouverClick} sx={{backgroundColor:"#000080", color:"white",  '&:hover': {
            backgroundColor: '#0000FF ', // Change text color on hover
          },}}>Imprimer</Button>
                </Grid>
                </center>

             
              
            </Stack>
          </form>
        </ModalDialog>
      ):(selectedDemand.__t === 'Conge' || selectedDemand.__t === 'Conge_')?(
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
                <center>
                <Grid item xs={1}>
                <Button type="submit" onClick={handleApprouverClick} sx={{backgroundColor:"#000080", color:"white",  '&:hover': {
            backgroundColor: '#0000FF ', // Change text color on hover
          },}}>Imprimer</Button>
                </Grid>
                </center>
              </Stack>
            </form>
          </ModalDialog>
        ):(selectedDemand.__t === 'Attestation Travail' || selectedDemand.__t === 'Attestation Travail_')?(
          <ModalDialog>
          <DialogTitle>  شهادة عمل
</DialogTitle>
          <DialogContent>Attestation de travail</DialogContent>
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
              <Grid item xs={1}>
              <Button type="submit" onClick={handleApprouverClick} sx={{backgroundColor:"#000080", color:"white",  '&:hover': {
          backgroundColor: '#0000FF ', // Change text color on hover
        },}}>Imprimer</Button>
              </Grid>
              </center>
            </Stack>
          </form>
        </ModalDialog>
      ):<></>}
        
      </Modal>
):<></>}
      
    </div>
  );
}

