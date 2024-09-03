import React, { useRef, useCallback } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const ApiKeyInput = ({ handleApiKeySubmit }) => {
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const apiKey = inputRef.current.value;
    if (apiKey.trim() !== '') {
      handleApiKeySubmit(apiKey);
      formRef.current.reset(); // This clears the form fields
    }
  }, [handleApiKeySubmit]);

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      {/* Logo */}
      <img 
        src={process.env.PUBLIC_URL + '/apple-icon-180x180.png'} 
        alt="Logo" 
        style={{ width: '150px', marginBottom: '20px' }} 
      />
      <Typography variant="h5" gutterBottom>
        Enter Your OpenAI API Key
      </Typography>
      <form ref={formRef} onSubmit={onSubmit}>
        <TextField
          inputRef={inputRef}
          type="password"
          name="api-key"
          placeholder="Enter your OpenAI API key"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          autoComplete="current-password"
          inputProps={{
            'aria-label': 'OpenAI API Key',
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 1 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ApiKeyInput;
