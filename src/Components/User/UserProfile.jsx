import React from 'react';
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';

const UserProfile = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 2, my: 3 }}>
        <Typography variant="h4" mb={2}>User Profile</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" mr={2}>Save Changes</Button>
            <Button variant="outlined" mr={2}>Change Password</Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, my: 3 }}>
        <Typography variant="h4" mb={2}>My Products</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" component={Link} to="/products/new">Add Product</Button>
          </Grid>
          {/* Replace with your own implementation */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, my: 1 }}>
              <Typography variant="h6" mb={1}>Product 1</Typography>
              <Typography variant="body1" mb={1}>Description of product 1</Typography>
              <Button variant="contained" color="primary" mr={2}>Edit</Button>
              <Button variant="outlined" color="error">Remove</Button>
            </Paper>
          </Grid>
          {/* Replace with your own implementation */}
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, my: 1 }}>
              <Typography variant="h6" mb={1}>Product 2</Typography>
              <Typography variant="body1" mb={1}>Description of product 2</Typography>
              <Button variant="contained" color="primary" mr={2}>Edit</Button>
              <Button variant="outlined" color="error">Remove</Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
