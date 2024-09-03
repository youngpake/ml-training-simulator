import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Confetti from 'react-confetti';

const CelebrationModal = ({ open, onClose, onNext, scenarioName }) => {
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    }
  }, []);

  return (
    <>
      {open && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          Congratulations!
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
            <EmojiEventsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" align="center" gutterBottom>
              You've successfully completed the scenario:
            </Typography>
            <Typography variant="h5" align="center" color="primary" gutterBottom>
              "{scenarioName}"
            </Typography>
            <Typography variant="body1" align="center">
              Great job applying the correct techniques to improve the model!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CelebrationIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 1 }} />
              <CelebrationIcon sx={{ fontSize: 40, color: 'secondary.main', ml: 1 }} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={onClose} color="primary" variant="outlined">
            Review Current Scenario
          </Button>
          <Button onClick={onNext} color="primary" variant="contained" startIcon={<CelebrationIcon />}>
            Next Scenario
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CelebrationModal;