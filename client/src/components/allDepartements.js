import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import { useProf } from '../context/ProfContext';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const backLink = process.env.REACT_APP_BACK_LINK;
const columns = [
  {
    field: 'libele',
    headerName: 'Libellé',
    editable: true,
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Déscription',
    editable: false,
    flex: 1,
  },
  {
    field: 'moreActions',
    headerName: 'Autres Actions',
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return <MoreActionsCell rowParams={params} />;
    },
  },
];

function CustomMenu({ onModifierClick, onSupprimerClick }) {
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
        aria-label="modifier"
        onClick={onModifierClick}
        style={{ marginRight: '0.5vw' }}
      >
        Modifier
      </Button>
      <Button
        variant="soft"
        aria-label="supprimer"
        onClick={() => onSupprimerClick(handleMenuOpen)}
        color="danger"
      >
        Supprimer
      </Button>
    </div>
  );
}

function UpdateDialog({ open, onClose, onUpdate, rowData }) {
  const [updatedData, setUpdatedData] = useState({
    libele: rowData.libele,
    description: rowData.description,
    // Add other fields as needed
  });

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    onUpdate(updatedData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier le département</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Libellé du Département
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  name="libele"
                  value={updatedData.libele}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Description du Département
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  required
                  rows={4} // Adjust the number of rows as needed
                  name="description"
                  value={updatedData.description}
                  onChange={handleChange}
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="neutral">
          Annuler
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  
}

function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirmDelete = () => {
    

    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmation de suppression</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Attention : En supprimant ce département, tous les professeurs associés à celui-ci seront également supprimés. Êtes-vous sûr de vouloir procéder à cette suppression ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="neutral">Annuler</Button>
        <Button onClick={handleConfirmDelete} color="danger">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function MoreActionsCell({ rowParams, fetchDepartements }) {
  const navigate = useNavigate();
  const { updateProf, updateHist } = useProf();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleMenuOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleMenuClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleModifierClick = () => {
    console.log('Modifier clicked for row:', rowParams.row);
    setUpdateDialogOpen(true);
  };

  const handleSupprimerClick = () => {
    console.log('Supprimer clicked for row:', rowParams.row);
    handleMenuOpen();
  };

  const handleUpdateData = async (updatedData) => {
    try {
      // Use axios.put or axios.patch to update the data on the server
      const response = await axios.put(
        `${backLink}/departements/update-departement/${rowParams.row._id}`,
        updatedData
      );

      console.log(response.data); // Log the server response
      setUpdateDialogOpen(false);
      window.location.reload(); // Fetch updated department list
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${backLink}/departements/delete-departement/${rowParams.row._id}`
      );

      console.log(response.data); // Log the server response
      handleMenuClose();
      window.location.reload(); // Fetch updated department list
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div>
      <CustomMenu onModifierClick={handleModifierClick} onSupprimerClick={handleSupprimerClick} />
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleMenuClose}
        onConfirm={handleConfirmDelete}
        fetchDepartements={fetchDepartements} // Pass the function down
      />
      <UpdateDialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        onUpdate={handleUpdateData}
        rowData={rowParams.row}
      />
    </div>
  );
}

export default function DataGridDemo() {
  const [departements, setDepartements] = useState([]);
  const navigate = useNavigate();

  const fetchDepartements = async () => {
    try {
      const response = await axios.get(
        `${backLink}/departements/all-departements`
      );
      setDepartements(response.data);
    } catch (error) {
      console.error('Error fetching departements:', error);
    }
  };

  useEffect(() => {
    fetchDepartements();
  }, []);

  const theme = useTheme();

  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: 'auto',
    flex: 1,
  }));

  const handleAddDep = () => {
    navigate('/add-departement');
  };

  return (
    <Box sx={{ height: 500, width: '99%' }}>
      <Button variant="solid" onClick={handleAddDep}>
        <AddIcon /> Nouveau Département
      </Button>
      <div>&ensp;</div>
      <DataGrid
        rows={departements}
        columns={columns}  // Use the defined 'columns' array directly
        getRowId={(row) => row._id}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        components={{
          MoreActionsCell: (params) => <MoreActionsCell {...params} fetchDepartements={fetchDepartements} />,
        }}
      />
    </Box>
  );
}
