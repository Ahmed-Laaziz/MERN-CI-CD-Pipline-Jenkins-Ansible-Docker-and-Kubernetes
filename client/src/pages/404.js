import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6} sx = {{marginTop:"15%"}}>
            <Typography variant="h3">
            <b>401 Unauthorized</b>
            </Typography>
            <Typography variant="h6">
            Your existing session token doesn't authorize you any more, so you are unauthorized
            </Typography>
            <Button component={Link} to="/" variant="contained" sx={{ marginTop: '5%' }}>
              Sign in
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://media.tenor.com/p0G_bmA2vSYAAAAd/login.gif"
              alt=""
              width={500} height={450}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
