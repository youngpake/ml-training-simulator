import React from 'react';
import { Box, Switch, Typography } from '@mui/material';

const DarkModeSwitch = ({ darkMode, toggleDarkMode }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Typography variant="body2">Light</Typography>
    <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
    <Typography variant="body2">Dark</Typography>
  </Box>
);

export default DarkModeSwitch;
