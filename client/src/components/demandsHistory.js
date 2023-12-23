import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backLink = process.env.REACT_APP_BACK_LINK;

export default function ColumnPinningDynamicRowHeight({prof}) {

  const [showEditDelete, setShowEditDelete] = React.useState(true);
  const navigate = useNavigate();
  // const handlePrintClick = (demand) => {
  //  if (demand.__t === 'DemandeQuitterTerritoire'){
  //   navigate('/autorisationQuitterTerritoire', { state: {input1:`${prof.prenom.split('|')[0]} ${prof.nom.split('|')[0]}`, input2:`${prof.cadre}` , input3:`${demand.de_date}`, input4:`${demand.a_date}`, input5:`${prof.prenom.split('|')[0]} ${prof.nom.split('|')[0]}`, input6:`${prof.cadre}`, input7:`${demand.universite}`}})
  //  }
  //  else if (demand.__t === 'DemandeConge')
  //   {
  //     navigate('/decisionConge', { state: {input1:`${prof.prenom.split('|')[0]} ${prof.nom.split('|')[0]}`, input2:`${prof.cadre}` , input3:`${demand.de_date}`, input4:`${demand.a_date}`, input5:`${demand.doti}`, input6:`${prof.cadre}`,}})
  //   }
  // };

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
      { field: 'updatedAt', headerName: 'Derniere modification',width: 210, type: 'Date', valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US');
      },editable: true },
      
      
    //   {
    //     field: 'actions',
    //     headerName: 'Actions',
    //     width: 210,
    //     renderCell: (params) => (
    //       <Stack spacing={1} sx={{ width: 1, py: 1 }}>
    //         {showEditDelete && (
    //           <React.Fragment>
    //             <Button 
    //             variant="outlined" 
    //             disabled={params.row.statut !== 'En attente'}
    //             size="small" startIcon={<EditIcon />}>
    //               Edit
    //             </Button>
    //             <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
    //               Delete
    //             </Button>
    //           </React.Fragment>
    //         )}
    //         {/* <Button
    //           variant="outlined"
    //           size="small"
    //           startIcon={<PrintIcon />}
    //           disabled={params.row.statut !== 'Approuvée'}
    //           onClick={() => handlePrintClick(params.row)}
    //         >
    //           Print
    //         </Button> */}
    //       </Stack>
    //     ),
    //   },
      
    ],
    // [showEditDelete],
  );

  const [demandes, setDemandes] = useState([]);
  
  const fetchDemandes = async () => {
    try {
      const response = await axios.get(
        backLink+`/demandes/allDemandes` // Replace with your actual API endpoint
      );
      setDemandes(response.data);
      const demandData = response.data;


      // Fetch and store professor names based on the demand's professor ID
      const professorNames = {};
      for (const demand of demandData) {
        try {
          const professorResponse = await axios.get(backLink+`/agent/agents/${demand.professeur}`);
          professorNames[demand.professeur] = professorResponse.data.nom.split('|')[0] + " " + professorResponse.data.prenom.split('|')[0]; // Replace 'nom' with the actual professor name field
        } catch (error) {
          console.error('Error fetching professor name:', error);
        }
      }
  
      // Attach professor names to demand objects
      const demandsWithProfessorNames = demandData.map((demand) => ({
        ...demand,
        professorName: professorNames[demand.professeur] || 'N/A', // Provide a default value if name not found
      }));
  
      setDemandes(demandsWithProfessorNames);
      console.log(demandsWithProfessorNames)
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
      {/* <Button sx={{ mb: 1 }} onClick={handleToggleClick}>
        Toggle edit & delete
      </Button> */}
      <div style={{ height: 500 }}>
        <DataGrid
          rows={demandes}
          columns={columns}
          getRowId={(row) => row._id}
          getRowHeight={() => 'auto'}
          // onCellClick={(params) => {
          //   if (params.field === 'actions') {
          //     handlePrintClick(params.row);
          //   }
          // }}
          initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
        />
      </div>
    </div>
  );
}

