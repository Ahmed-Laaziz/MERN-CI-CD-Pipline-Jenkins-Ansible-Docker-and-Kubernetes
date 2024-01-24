import DemandesTable from '../components/adminDemandsTable';
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Breadcrumb from '../components/breadcrumb';
import React from 'react';

const backLink = process.env.REACT_APP_BACK_LINK
export default function AdminDemandes(){

    return(
        <Box sx={{ display: 'flex' }}>
        <Drawer role='Admin' pageTitle={"Demandes"}/>

        
        <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    marginTop: "5%",
    marginLeft: "0%",
    marginRight: "0%",
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add the boxShadow property
  }}
>
<Breadcrumb pageLabel="Demandes"/>

<>&nbsp;</>

  <DemandesTable sx={{marginTop:'10%'}}/>

  
</Box>

      </Box>
    )
}