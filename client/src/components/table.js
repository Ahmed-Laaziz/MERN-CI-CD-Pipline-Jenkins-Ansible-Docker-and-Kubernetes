import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/joy/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { useProf } from '../context/ProfContext';
import AddIcon from '@mui/icons-material/Add';
const backLink = process.env.REACT_APP_BACK_LINK;

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
        Profil
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

function DataGridDemo({ admin_dep }) {
  const [professeurs, setProfesseurs] = useState([]);
  const navigate = useNavigate();
  const { updateProf, updateHist } = useProf();
  function handleAddUser(){
    if (admin_dep != "FCT"){
    navigate('/add-professor')}
    else {
      navigate('/add-fonctionnaire')
    }
  }


  const fetchProfessor = async () => {
    try {
      let response;
      if (admin_dep == 'TRI') {
        response = await axios.get(backLink + `/prof/professeurs-TRI`);
      } else if (admin_dep == 'STIN') {
        response = await axios.get(backLink + `/prof/professeurs-CP`);
      } else if (admin_dep == 'FCT') {
        response = await axios.get(backLink + `/prof/professeurs-FCT`);
      } else {
        response = await axios.get(backLink + `/prof/all-professeurs`);
      }
      setProfesseurs(response.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  useEffect(() => {
    fetchProfessor();
  }, [admin_dep]);

  const handleExportExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const dataForExport = professeurs.map(({ password, ...rest }) => rest);

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = 'professeurs' + fileExtension;
    saveAs(data, fileName);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    },
    {
      field: 'departement',
      headerName: admin_dep == 'FCT' ? 'Service' : 'Département',
      editable: false,
    },
    {
      field: 'moreActions',
      headerName: 'Autres Actions',
      sortable: false,
      renderCell: (params) => <MoreActionsCell rowParams={params} />,
    },
  ];

  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: isSmallScreen ? 'auto' : 150,
    flex: 1,
  }));

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Button variant="outlined" onClick={handleExportExcel}>
        <DownloadIcon /> Exporter sous Excel
      </Button>
      
        &nbsp;
        &nbsp;
      
      <Button variant="solid" onClick={handleAddUser}>
        <AddIcon /> Nouveau professeur
      </Button>
      <div>&ensp;</div>
      <DataGrid
        rows={professeurs}
        columns={responsiveColumns}
        getRowId={(row) => row._id}
        pageSize={isSmallScreen ? 5 : 7}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default DataGridDemo;
