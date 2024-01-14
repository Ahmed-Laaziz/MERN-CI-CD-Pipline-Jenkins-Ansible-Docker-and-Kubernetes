import FilesTable from '../components/download/profFiles';
import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumb from '../components/breadcrumb';
import jwt_decode from 'jwt-decode';
import axios from'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProf } from '../context/ProfContext';


const backLink = process.env.REACT_APP_BACK_LINK

export default function ProfDemandes(){

  const { prof, hist } = useProf();
  console.log("hist variable contains : " + prof._id)

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


// if (!agent) {
//   return <div>Loading...</div>;
// }

  const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Set the token in your component state
          setToken(storedToken);
        }
        // } else {
        //   // If no token is found, navigate to the login page
        //   navigate('/');
        // }
      }, [navigate]);


    return(
        <Box sx={{ display: 'flex' }}>
        {/* {agent?(
        <Drawer role={agent.__t} pageTitle={"Documents"}/>
      ):null} */}


{
  agent ? (
    agent.__t === "Admin" && agent.fonction === "Chef de Département" ? (
      <Drawer role='Chef' pageTitle={"Documents"} />
    ) : agent.__t === "Admin" ? (
      <Drawer role='Admin' pageTitle={"Documents"} />
    ) : agent.__t === "Professeur" ? (
      <Drawer role='Professeur' pageTitle={"Documents"} />
    ) : null
  ) : null
}
        
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
<Breadcrumb pageLabel="Documents administratifs"/>
{/* <>&nbsp;</> */}
{/* {agent?(
  <FilesTable sx={{marginTop:'10%'}} prof={agent}/>
):null} */}

{agent ? (
            (agent.__t=="Admin")?(
              <FilesTable sx={{marginTop:'10%'}} prof={prof}/>
            ):<FilesTable sx={{marginTop:'10%'}} prof={agent}/>
          ):null}
  
</Box>

      </Box>
    )
}