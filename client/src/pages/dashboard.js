import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from "../components/drawer";
import Box from '@mui/material/Box';
import jwt_decode from 'jwt-decode';
import Button from '@mui/joy/Button';
import axios from'axios';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import ProfileBar from '../components/profileBar';
import ProfileData from '../components/profileData';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/joy/Avatar';
import Divider from '@mui/joy/Divider';
import Breadcrumb from '../components/breadcrumb';

// import { useToken } from '../auth/TokenContext';
import ErrorPage from './404';

const backLink = process.env.REACT_APP_BACK_LINK

export default function Dashboard(){
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

const [professeurs, setProfesseurs] = useState([]);
  
  const fetchProfessor = async () => {
    try {
      const response = await axios.get(
        backLink+`/prof/professeurs` // Replace with your actual API endpoint
      );
      // const professeurs = response.data;
      setProfesseurs(response.data);
      console.log("all professors: ")
      console.log(professeurs)
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

  const departmentCounts = professeurs.reduce((counts, professor) => {
    const department = professor.departement;
    counts[department] = (counts[department] || 0) + 1;
    return counts;
  }, {});
  
  const cadreCounts = professeurs.reduce((counts, professor) => {
    const cadre = professor.cadre;
    counts[cadre] = (counts[cadre] || 0) + 1;
    return counts;
  }, {});

  // Extract department names and counts for the chart
  const departmentNames = Object.keys(departmentCounts);
  const departmentValues = Object.values(departmentCounts);

  const cadreNames = Object.keys(cadreCounts);
  const cadreValues = Object.values(cadreCounts);

// Get the user ID from the token
const agentId = getUserIdFromToken(token);
const [agent, setAgent] = useState(null);
const [notifs, setNotifs] = useState(null);
console.log('userId : ' + agentId);
useEffect(() => {
  const fetchAgentData = async () => {
    try {
      const response = await axios.get(backLink+`/agent/agents/${agentId}`);
      console.log("user: ")
      console.log(agent)
      
      setAgent(response.data);
      console.log("agent: "+ agent)
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  const fetchAgentNotifs = async () => {
    try {
      const res = await axios.post(backLink+'/notifs/prof-notif', { "prof": agentId });
      
      setNotifs(res.data);
      
      
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  if (agentId) {
    fetchAgentData();
    fetchAgentNotifs();

  }

  fetchProfessor();

  console.log("the agent is :")
  console.log(agent)
}, [agentId]);

useEffect(() => {
  console.log("notifs:", notifs);
}, [notifs]);


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
      return (
        <div>
        {token ? (
          <Box sx={{ display: 'flex' }}>
            {agent ? (
              (agent.__t === 'Admin' && agent.fonction === 'Chef de Département') ? (
                <Drawer role="Chef" pageTitle={"Page d'accueil"} notifs={notifs} prof={agentId} />
              ) : <Drawer role={agent.__t} pageTitle={"Page d'accueil"} notifs={notifs} prof={agentId} />
            ) : null}
    {agent && agent.__t === 'Admin' ? (
         <Box
         component="main"
         sx={{
           flexGrow: 1,
           p: 3,
           marginTop: "5%",
           justifyContent: 'center',
           alignItems: 'center',
           width: '100%', // Full width
         }}
       >
            <Breadcrumb pageLabel="Dashboard"/>
<>&nbsp;</>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',  // Three columns for three cards
              gap: 1,
              maxWidth: '100%',  // Adjust the maximum width as needed
              width: '100%',       // Ensure the grid takes up the full width
            }}
          >
            <Card variant="solid" color="primary" invertedColors sx={{ width: '100%' }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                    {/* Left section */}
                    <Grid item>
                        <Avatar alt="Remy Sharp" sx={{ width: '80px', height: '80px' }} variant="soft">
                        <Typography level="h2">TRI</Typography>
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <CardContent>
                        <Typography level="h3">Département TRI</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <CardContent>
                        <Typography fontSize={72} level='h2' sx={{ paddingLeft: "6vw" }}>{ departmentCounts["TRI"] }</Typography>
                        </CardContent>
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>
    
            <Card variant="solid" color="warning" invertedColors sx={{ width: '100%' }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                    {/* Left section */}
                    <Grid item>
                        <Avatar alt="Remy Sharp" sx={{ width: '80px', height: '80px' }} variant="soft">
                        <Typography level="h2">GE</Typography>
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <CardContent>
                        <Typography level="h3">Département GE</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <CardContent>
                        <Typography fontSize={72} level='h2' sx={{ paddingLeft: "6vw"}}>{ departmentCounts["GE"] }</Typography>
                        </CardContent>
                    </Grid>
                    </Grid>
                </CardContent>

            </Card>
    
            <Card variant="solid" color="neutral" invertedColors sx={{ width: '100%' }}>
  <CardContent>
    <Grid container spacing={2} alignItems="center">
      {/* Left section */}
      <Grid item>
        <Avatar alt="Remy Sharp" sx={{ width: '80px', height: '80px' }} variant="soft">
          <Typography level="h2">CP</Typography>
        </Avatar>
      </Grid>
      <Grid item>
        <CardContent>
          <Typography level="h3">Cycle préparatoire</Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <CardContent>
          <Typography
            fontSize={72}
            level="h2"
            sx={{marginLeft: "6vw" }} // Set both margins to 1vw
          >
            { departmentCounts["CP"] }
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  </CardContent>
</Card>

            
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',  // Three columns for three cards
              gap: 1,

              maxWidth: '100%',  // Adjust the maximum width as needed
              width: '100%', 

              marginTop: "3%"      // Ensure the grid takes up the full width
            }}
          >
              <Card variant="outlined" sx={{ height: '50vh' }}>
  <Typography level="h3">Professeur par département :</Typography>
  <Divider inset="none" />
  <CardContent>
    {departmentNames.length > 0 && departmentValues.length > 0 ? (
      <BarChart
        xAxis={[{ scaleType: 'band', data: departmentNames }]}
        series={[{ data: departmentValues }]}

        sx={{ width: '100%', height: '100%' }} // Adjust based on your needs
      />
    ) : (
      <Typography>Loading...</Typography>
    )}
  </CardContent>
</Card>


<Card variant="outlined" sx={{ height: '50vh' }}>
            <Typography level="h3">Professeur par cadre :</Typography>
            <Divider inset="none" />
            <CardContent>
              {cadreNames.length > 0 && cadreValues.length > 0 ? (
                <PieChart

                  series={[
                    {
                      data: cadreNames.map((cadre, index) => ({
                        id: index,
                        value: cadreValues[index],
                        label: cadre,
                      })),
                    },
                  ]}
                  sx={{
                    width: { xs: 200, sm: 300, md: 400, lg: 500, xl: 650 }, // Adjust based on your needs
                    height: { xs: 100, sm: 150, md: 200, lg: 250, xl: 300 }, // Adjust based on your needs
                  }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: 0,
                      fontSize: 18,
                    },
                  }}
                  margin={{ right: 300 }}
                />
              ) : (
                <Typography>Loading...</Typography>
              )}
            </CardContent>
          </Card>
          </Box>
          
        </Box>
        ) : (
          <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: "5%",
            marginLeft: "2%", // Adjust margin
            marginRight: "2%", // Adjust margin
            width: '96%', // Adjust width
          }}
        >
          <ProfileBar agent={agent} />
            <ProfileData agent={agent} />
          </Box>
        )}
    </Box>
    
    ) : (
            <ErrorPage />
          )}
        </div>
      )
}
