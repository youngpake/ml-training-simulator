import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Feedback = ({ feedback, isExcellentAnswer }) => (
  feedback ? (
    <Paper sx={{ p: 2, mt: 2, bgcolor: 'background.paper' }}>
      {isExcellentAnswer && (
        <Box display="flex" alignItems="center" mb={1}>
          <CheckCircleIcon color="success" />
          <Typography variant="body1" color="success.main" ml={1}>
            Excellent answer!
          </Typography>
        </Box>
      )}
      <Typography variant="body2">{feedback}</Typography>
    </Paper>
  ) : null
);

export default Feedback;