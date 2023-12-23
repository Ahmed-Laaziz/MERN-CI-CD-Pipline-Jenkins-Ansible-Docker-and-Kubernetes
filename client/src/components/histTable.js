import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios
import { useLocation } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useProf } from '../context/ProfContext';
const backLink = process.env.REACT_APP_BACK_LINK;

const columns = [
  {
    field: 'cadre',
    headerName: 'Cadre',
    editable: false,
  },
  {
    field: 'grade',
    headerName: 'Grade',
    editable: true,
  },
  {
    field: 'classe',
    headerName: 'Classe',
    editable: false,
  },
  
  {
    field: 'date',
    headerName: 'Date',
    type: 'Date',
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString('en-US');
    },
    editable: false,
  },
];



export function DataHist() {

  const [hists, setHistoriques] = useState([]);
  const { prof, hist } = useProf();

  console.log(prof._id)
  const fetchHist = async () => {
    try {
      const response = await axios.post(
        backLink+`/hist/prof-hist`, {"prof": prof._id} // Replace with your actual API endpoint
      );
      setHistoriques(response.data);
      
      const histData = response.data;

      if (histData){
        try {
          const professorResponse = await axios.get(backLink+`/agent/agents/${prof._id}`);
          const professorCadre = professorResponse.data.cadre; // Replace 'nom' with the actual professor name field
          const histWithProfessorCadre = histData.map((hist) => ({
            ...hist,
            cadre: professorCadre || 'N/A', // Provide a default value if name not found
          })
          );
          setHistoriques(histWithProfessorCadre)
        } catch (error) {
          console.error('Error fetching professor cadre:', error);
        }
      }

      

     

    } catch (error) {
      console.error('Error fetching title:', error);
    }

    
  };

  useEffect(() => {
    // Fetch the title from the backend API

    fetchHist(); // Call the fetchTitle function when the component mounts
  }, []);

  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: 'auto', // Set width to 'auto'
    flex: 1, // Set flex property for each column
  }));

  return (
    <Box sx={{ height: 400, width: '99%' }}>
      <DataGrid
        rows={hist} // Use the fetched data for rows
        columns={responsiveColumns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
