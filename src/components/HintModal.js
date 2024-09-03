import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const HintModal = ({ open, onClose, hint }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex', alignItems: 'center' }}>
        <LightbulbIcon sx={{ mr: 1 }} />
        Hint
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="body1">{hint}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HintModal;