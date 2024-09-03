import React from 'react';
import { TextField, Button } from '@mui/material';

const UserInput = ({ userInput, setQuizState, handleSubmit, isLoading }) => (
  <>
    <TextField
      value={userInput}
      onChange={(e) => setQuizState(prev => ({ ...prev, userInput: e.target.value }))}
      placeholder="Suggest an improvement..."
      fullWidth
      variant="outlined"
      sx={{ mb: 2 }}
    />
    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth disabled={isLoading}>
      {isLoading ? 'Recalculating...' : 'Submit'}
    </Button>
  </>
);

export default UserInput;