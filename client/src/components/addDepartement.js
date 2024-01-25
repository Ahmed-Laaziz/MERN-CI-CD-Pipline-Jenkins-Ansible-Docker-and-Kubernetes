import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backLink = process.env.REACT_APP_BACK_LINK;

export default function DepartementForm() {
  const navigate = useNavigate();

  const [libele, setLibele] = useState('');
  const [description, setDescription] = useState('');

  const handleLibeleChange = (e) => {
    setLibele(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const addDepartement = async () => {
    try {
      const url = `${backLink}/departements/add-departement`;
      const requestData = {
        libele: libele.toUpperCase(),
        description: description,
      };

      // Make a POST request to your backend API
      const response = await axios.post(url, requestData);
      navigate(`/all-departements`);
    } catch (error) {
      console.error("Error adding departement:", error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Ajouter un Département
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Code du Département
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
                value={libele}
                onChange={handleLibeleChange}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Libellé du Département
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                required
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={addDepartement} style={{ marginTop: '20px' }}>
          Ajouter Département
        </Button>
      </form>
    </Box>
  );
}
