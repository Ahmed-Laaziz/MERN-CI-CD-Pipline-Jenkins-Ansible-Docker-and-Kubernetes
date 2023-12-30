import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Redirect } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/joy/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { useProf } from '../context/ProfContext';
const backLink = process.env.REACT_APP_BACK_LINK
const columns = [
  {
    field: 'prenom',
    headerName: 'Prénom',
    editable: true,
  },
  {
    field: 'nom',
    headerName: 'Nom',
    editable: false,
  },
  {
    field: 'cadre',
    headerName: 'Cadre',
    sortable: true,
    // valueGetter: () => 'Professeur assistant'
  },
  {
    field: 'num_loyer',
    headerName: 'Numéro de loyer',
    type: 'number',
    editable: false,
  },
  {
    field: 'departement',
    headerName: 'Département',
    type: 'number',
    editable: false,
  },
  {
    field: 'date_visa',
    headerName: 'Date du visa',
    type: 'Date',
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString('en-US');
    },
    editable: false,
  },
  {
    field: 'date_effective',
    headerName: 'Date effective',
    type: 'Date',
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString('en-US');
    },
    editable: false,
  },
  {
    field: 'moreActions',
    headerName: 'Autres Actions',
    sortable: false,
    renderCell: (params) => {
      return <MoreActionsCell rowParams={params} />;
    },
  },
];

function CustomMenu({ onHistoriqueClick, onProfileClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="soft"
        aria-label="profile"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={onProfileClick}
        style={{ marginRight: '0.5vw' }}
      >
        Profile
      </Button>
      <Button
        variant="soft"
        aria-label="historique"
        aria-controls="historique-menu"
        aria-haspopup="true"
        onClick={onHistoriqueClick}
      >
        Historique
      </Button>
    </div>
  );
}



function MoreActionsCell({ rowParams }) {
  const navigate = useNavigate();
  const { updateProf, updateHist } = useProf();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHistoriqueClick = async () => {
    const hists = await axios.post(
      backLink+`/hist/prof-hist`, {"prof": rowParams.row._id} // Replace with your actual API endpoint
    );
    
    updateHist(hists.data);
    
    navigate("/historiques");
    handleMenuClose();
  };

  const handleProfileClick = async () => {
    updateProf(rowParams.row);

    const hists = await axios.post(
      backLink+`/hist/prof-hist`, {"prof": rowParams.row._id} // Replace with your actual API endpoint
    );
    
    updateHist(hists.data);
    
    navigate("/prof-profile");
    handleMenuClose();
  };

  return (
    <CustomMenu
  onHistoriqueClick={handleHistoriqueClick}
  onProfileClick={handleProfileClick}
/>
  );
}


export default function DataGridDemo() {
  const [professeurs, setProfesseurs] = useState([]);
  
  const fetchProfessor = async () => {
    try {
      const response = await axios.get(
        backLink+`/prof/professeurs` // Replace with your actual API endpoint
      );
      // const professeurs = response.data;
      setProfesseurs(response.data);
      // const professorsCadre = {};
      // for (const professeur of professeurs) {
      //   try {
      //     const response = await axios.post(
      //       backLink+`/hist/prof-hist`, {"prof": professeur._id} // Replace with your actual API endpoint
      //     );
      //     professorsCadre[professeur._id] = response.data[0].cadre; // Replace 'nom' with the actual professor name field
      //   } catch (error) {
      //     console.error('Error fetching professor name:', error);
      //   }
      // }
    } catch (error) {
      console.error('Error fetching title:', error);
    }
  };

  // Attach professor names to demand objects
  // const demandsWithProfessorNames = professeurs.map((professeur) => ({
  //   ...professeur,
  //   cadre: 'professeur assistant', // Provide a default value if name not found
  // }));
  
  
  console.log(professeurs)

  useEffect(() => {
    // Fetch the title from the backend API

    fetchProfessor(); // Call the fetchTitle function when the component mounts
  }, []);

  const handleExportExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // Exclude password column from export
    const dataForExport = professeurs.map(({ password, ...rest }) => rest);

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = 'professeurs' + fileExtension;
    saveAs(data, fileName);
  };

  const theme = useTheme();


  // Adjust column widths based on screen size
  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: 'auto', // Set width to 'auto'
    flex: 1, // Set flex property for each column
  }));

  return (
    <Box sx={{ height: 500, width: '99%' }}>
    <Button variant="outlined" onClick={handleExportExcel}>
        Export as Excel
      </Button>
      <div>
      &ensp;
      </div>
      <DataGrid
        rows={professeurs} // Use the fetched data for rows
        columns={responsiveColumns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
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
