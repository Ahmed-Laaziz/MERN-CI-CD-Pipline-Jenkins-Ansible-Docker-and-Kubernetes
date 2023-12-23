import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../../components/drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumb from '../../../components/breadcrumb';
import DemandeOptions from '../../../components/demands/admin/demands';
import ErrorPage from '../../404';
import axios from'axios';
import jwt_decode from 'jwt-decode';

const backLink = process.env.REACT_APP_BACK_LINK

export default function Options(){
  const [token, setToken] = useState('');
    console.log(token);
  // Function to extract user ID from the JWT token
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.id; // Assuming "id" is the key used in the token payload
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// Get the user ID from the token
const agentId = getUserIdFromToken(token);
const [agent, setAgent] = useState(null);
console.log('userId : ' + agentId);
useEffect(() => {
  const fetchAgentData = async () => {
    try {
      const response = await axios.get(backLink+`/agent/agents/${agentId}`);
      setAgent(response.data);
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  if (agentId) {
    fetchAgentData();
  }
}, [agentId]);


const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Set the token in your component state
          setToken(storedToken);
        }
      }, [navigate]);


    return(
//         <Box sx={{ display: 'flex' }}>
//         <Drawer role='Professeur'/>
//         <Box
//   component="main"
//   sx={{
//     flexGrow: 1,
//     p: 3,
//     marginTop: "8%",
//     marginLeft: "5%",
//     marginRight: "5%",
//     // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add the boxShadow property
//   }}
// >
// <Breadcrumb />
// <>&nbsp;</>
//   <DemandeOptions />
// </Box>

//       </Box>

<div>
      {token ? (
        // Render content for logged-in users
        <Box sx={{ display: 'flex' }}>
          {(agent && agent.__t === 'Admin') ? (
            <>
            <Drawer role={agent.__t} pageTitle={"Demandes"}/>
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
<Breadcrumb pageLabel="Demandes administratives"/>
 <>&nbsp;</>
   <DemandeOptions prof={agent}/>
            </Box>
            </>
          ):<h1 style={{margin:"auto", marginTop:"10%"}}>Ooops! Espace reservée pour les Admins</h1>}
        
        

      </Box>
      ) : (
        // Render content for users not logged in
        <ErrorPage/>
      )}
    </div>
    )
}