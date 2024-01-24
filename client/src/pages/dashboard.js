import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from "../components/drawer";
import Box from '@mui/material/Box';
import jwt_decode from 'jwt-decode';
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
const triProfesseurs = professeurs.length > 0 ? professeurs.filter(professor => professor.departement === 'TRI') : [];
const [tri, setTri] = useState([]);
  
  const fetchProfessor = async () => {
    try {
      const response = await axios.get(
        backLink+`/prof/professeurs` // Replace with your actual API endpoint
      );
      // const professeurs = response.data;
      setProfesseurs(response.data);
      setTri(professeurs.filter(professor => professor.departement === 'TRI'))
      //console.log("all professors: ")
      console.log("tri professors :")
      console.log(tri)

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

  let depcountNames;
  let depacountValues;

// Get the user ID from the token
const agentId = getUserIdFromToken(token);
const [agent, setAgent] = useState(null);
const [notifs, setNotifs] = useState(null);
const [departmentCadreCounts, setDepartmentCadreCounts] = useState(null);
const [departmentGanreCounts, setDepartmentGenreCounts] = useState(null);

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
  if (agent && agent.dep_label) {
    const counts = professeurs
      .filter(professor => professor.departement === agent.dep_label)
      .reduce((counts, professor) => {
        const depcadre = professor.cadre;
        counts[depcadre] = (counts[depcadre] || 0) + 1;
        return counts;
      }, {});

    setDepartmentCadreCounts(counts);


    console.log("dep counts :");
    console.log(counts);
  }
}, [agent]);

useEffect(() => {
  if (agent && agent.dep_label) {
    const counts = professeurs
      .filter(professor => professor.departement === agent.dep_label)
      .reduce((counts, professor) => {
        const depgenre = professor.genre;
        counts[depgenre] = (counts[depgenre] || 0) + 1;
        return counts;
      }, {});

    setDepartmentGenreCounts(counts);


    console.log("genre counts :");
    console.log(counts);
  }
}, [agent]);

const cardColors = ['primary'];
const cardColors2 = ['warning'];

useEffect(() => {
  console.log("notifs:", notifs);
}, [notifs]);

  const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Set the token in your component state
          setToken(storedToken);
        }

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
{agent.fonction !== 'Secrétaire' ? (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: departmentCadreCounts
                ? `repeat(${Object.keys(departmentCadreCounts).length}, 1fr)`
                : '1fr', // Default value or adjust as needed
              gap: 1,
              maxWidth: '100%',
              width: '100%',
            }}
          >
            {departmentCadreCounts &&
              Object.entries(departmentCadreCounts).map(([cadre, count], index) => (
                // Display cards for the first two entries
                index < 5 && (
                  <Card
                    variant="solid"
                    color={index === 0 ? 'primary' : index === 1 ? 'warning' : 'neutral'}
                    invertedColors
                    sx={{ width: '100%' }}
                    key={cadre}
                  >

                    <CardContent width="100%">
                      <Grid container spacing={2} alignItems="center" width="100%">
                        {/* Left section */}
                        <Grid item>
                          <Avatar alt="Remy Sharp" sx={{ width: '80px', height: '80px' }} variant="soft">
                            <Typography level="h1">{cadre && cadre[0]?.toUpperCase()}</Typography>
                          </Avatar>
                        </Grid>
                        <Grid item width="50%">
                          <CardContent>
                            <Typography level="h3">{cadre}</Typography>
                          </CardContent>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                          <CardContent>
                            <Typography
                              fontSize={72}
                              level="h2"
                              sx={{ marginLeft: 'auto', paddingRight: 1 }}
                            >
                              {count !== undefined ? count : 'N/A'}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )
              ))}
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
  <Typography level="h3">Fonctionnaires par genre :</Typography>
  <Divider inset="none" />
  <CardContent>
    {departmentGanreCounts && Object.keys(departmentGanreCounts).length > 0 ? (
      <BarChart
        xAxis={[{ scaleType: 'band', data: Object.keys(departmentGanreCounts) }]}
        series={[{ data: Object.values(departmentGanreCounts) }]}
        sx={{ width: '100%', height: '100%' }} // Adjust based on your needs
      />
    ) : (
      <Typography>No data available.</Typography>
    )}
  </CardContent>
</Card>


<Card variant="outlined" sx={{ height: '50vh' }}>
  <Typography level="h3">Fonctionnaires par cadre :</Typography>
  <Divider inset="none" />
  <CardContent>
    {departmentCadreCounts && Object.keys(departmentCadreCounts).length > 0 ? (
      <PieChart
        series={[
          {
            data: Object.entries(departmentCadreCounts).map(([cadre, value]) => ({
              id: cadre,
              value: value,
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
      <Typography>No data available.</Typography>
    )}
  </CardContent>
</Card>

          </Box>
        </>
       ) : (
        <>
        <Box>
        <Typography level="h3" sx={{marginTop: '1%' }}>Departements :</Typography>
  <Divider inset="none" sx={{ marginBottom: '2%', marginTop: '1%' }}/>
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Object.keys(departmentCounts)
        .filter(departmentKey => departmentKey === departmentKey.toUpperCase() && departmentKey !== 'FCT').length}, 1fr)`,
      gap: 2,
      maxWidth: '100%',
      width: '100%',
    }}
  >
    {Object.keys(departmentCounts)
      .filter(departmentKey => departmentKey === departmentKey.toUpperCase() && departmentKey !== 'FCT')
      .map((departmentKey, index) => (
        <Card
          key={departmentKey}
          variant="soft"
          color={cardColors[index % cardColors.length]} // Cycling through the colors for each card
          invertedColors
          sx={{ width: '100%' }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              {/* Left section */}
              <Grid item>
                <Avatar alt="Department Avatar" sx={{ width: '80px', height: '80px' }} variant="soft">
                  <Typography level="h1" color="common.white">
                    {departmentKey[0]?.toUpperCase()}
                  </Typography>
                </Avatar>
              </Grid>
              <Grid item width="45%">
                <CardContent>
                  <Typography level="h3">{`Département ${departmentKey}`}</Typography>
                </CardContent>
              </Grid>
              <Grid>
                <CardContent>
                  <Typography fontSize={72} level="h2" sx={{ paddingLeft: '12vw', paddingTop: 0 }}>
                    {departmentCounts[departmentKey]}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
  </Box>
</Box>

<Box>
  <Typography level="h3" sx={{marginTop: '1%' }}>Services :</Typography>
  <Divider inset="none" sx={{ marginBottom: '2%', marginTop: '1%' }}/>
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Object.keys(departmentCounts)
        .filter(departmentKey => departmentKey !== departmentKey.toUpperCase() && departmentKey).length}, 1fr)`,
      gap: 2,
      maxWidth: '100%',
      width: '100%',
    }}
  >
    {Object.keys(departmentCounts)
      .filter(departmentKey => departmentKey !== departmentKey.toUpperCase() && departmentKey)
      .map((departmentKey, index) => (
        <Card
          key={departmentKey}
          variant="soft"
          color={cardColors2[index % cardColors2.length]} // Cycling through the colors for each card
          invertedColors
          sx={{ width: '100%' }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              {/* Left section */}
              <Grid item>
                <Avatar alt="Department Avatar" sx={{ width: '80px', height: '80px' }} variant="soft">
                  <Typography level="h1" color="common.white">
                    {departmentKey[0]?.toUpperCase()}
                  </Typography>
                </Avatar>
              </Grid>
              <Grid item width="45%">
                <CardContent>
                  <Typography level="h3">{`Service ${departmentKey}`}</Typography>
                </CardContent>
              </Grid>
              <Grid>
                <CardContent>
                  <Typography fontSize={72} level="h2" sx={{ paddingLeft: '12vw', paddingTop: 0 }}>
                    {departmentCounts[departmentKey]}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
  </Box>
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
  <Typography level="h3">Fonctionnaires par département / service :</Typography>
  <Divider inset="none" />
  <CardContent>
    {departmentNames.length > 0 && departmentValues.length > 0 ? (
      <BarChart
        xAxis={[{ scaleType: 'band', data: departmentNames.filter(name => name !== 'FCT') }]}
        series={[{ data: departmentValues }]}
        sx={{ width: '100%', height: '100%' }} // Adjust based on your needs
      />
    ) : (
      <Typography>Loading...</Typography>
    )}
  </CardContent>
</Card>



<Card variant="outlined" sx={{ height: '50vh' }}>
            <Typography level="h3">Fonctionnaires par cadre :</Typography>
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
        </>
      )}   
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
