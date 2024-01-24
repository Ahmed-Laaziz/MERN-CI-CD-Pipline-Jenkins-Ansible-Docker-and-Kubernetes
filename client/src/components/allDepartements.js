import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios
import { useTheme } from '@mui/material/styles';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import { useProf } from '../context/ProfContext';
import AddIcon from '@mui/icons-material/Add';

const backLink = process.env.REACT_APP_BACK_LINK
const columns = [
  {
    field: 'libele',
    headerName: 'Libelé',
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
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
        style={{ marginRight: '0.5vw' }}
      >
        Modifier
      </Button>
      <Button
        variant="soft"
        aria-label="historique"
        aria-controls="historique-menu"
        color="danger"
        aria-haspopup="true"
      >
        Supprimer
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

  return (
    <CustomMenu/>
  );
}


export default function DataGridDemo() {
  const [departements, setDepartements] = useState([]);
  const navigate = useNavigate();
  function handleAddDep(){
      navigate('/add-departement')
  }
  
  const fetchDepartements = async () => {
    try {
        const response = await axios.get(
          `${backLink}/departements/all-departements` // Replace with your actual API endpoint
        );
        setDepartements(response.data);
    } catch (error) {
      console.error('Error fetching title:', error);
    }
  };

  console.log(departements)

  useEffect(() => {
    // Fetch the title from the backend API

    fetchDepartements(); // Call the fetchTitle function when the component mounts
  }, []);

  const theme = useTheme();


  // Adjust column widths based on screen size
  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: 'auto', // Set width to 'auto'
    flex: 1, // Set flex property for each column
  }));

  return (
    <Box sx={{ height: 500, width: '99%' }}>
      &nbsp;
        &nbsp;
      
      <Button variant="solid" onClick={handleAddDep}>
        <AddIcon /> Nouveau Departement
      </Button>
      <div>
      &ensp;
      </div>
      <DataGrid
        rows={departements} // Use the fetched data for rows
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
