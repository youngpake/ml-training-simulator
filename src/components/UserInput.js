import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const UserInput = ({ userInput, setQuizState, handleSubmit, isLoading }) => {
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 10000); // Stop pulsing after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        value={userInput}
        onChange={(e) => setQuizState(prev => ({ ...prev, userInput: e.target.value }))}
        placeholder="Suggest an improvement..."
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          animation: isPulsing ? `${pulseAnimation} 2s infinite` : 'none',
          '&:hover, &:focus': {
            animation: 'none',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.4)',
          },
        }}
        helperText={
          <Typography variant="caption" color="primary">
            Enter your suggestion here to improve the model
          </Typography>
        }
      />
      <Button 
        onClick={handleSubmit} 
        variant="contained" 
        color="primary" 
        fullWidth 
        disabled={isLoading}
        sx={{
          transition: 'all 0.3s ease',
          '&:not(:disabled):hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {isLoading ? 'Recalculating...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default UserInput;