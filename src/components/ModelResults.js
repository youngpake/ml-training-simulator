import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const ModelResults = ({ modelResults }) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    {Object.entries(modelResults).map(([key, value]) => (
      <Grid item xs={6} sm={4} key={key}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
          <Typography variant="h6">{typeof value === 'number' ? value.toFixed(2) : value}</Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default ModelResults;
