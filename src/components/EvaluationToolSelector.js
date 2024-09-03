import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography, Button, styled } from '@mui/material';

export const defaultTools = ['Accuracy', 'Loss', 'Validation Loss'];

const evaluationTools = [
  { name: 'Accuracy', description: 'Measures how often the model makes correct predictions.' },
  { name: 'Loss', description: 'Quantifies the difference between predicted and actual values.' },
  { name: 'Validation Loss', description: 'Quantifies the error on a separate dataset used to tune the model.' },
  { name: 'Precision', description: 'The ratio of true positives to all positive predictions.' },
  { name: 'Recall', description: 'The ratio of true positives to all actual positive instances.' },
  { name: 'F1 Score', description: 'The harmonic mean of precision and recall.' },
];

const StyledLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isDefault',
})(({ theme, isDefault }) => ({
  opacity: isDefault ? 0.7 : 1,
  '& .MuiTypography-root': {
    color: isDefault ? theme.palette.text.primary : undefined,
  },
}));

const StyledCheckbox = styled(Checkbox, {
  shouldForwardProp: (prop) => prop !== 'isDefault',
})(({ theme, isDefault }) => ({
  color: isDefault ? theme.palette.primary.main : undefined,
}));

export const EvaluationToolSelector = ({ selectedTools, handleToolSelection, onSubmit }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Select additional evaluation tools you want to learn about:
      </Typography>
      <FormGroup>
        {evaluationTools.map((tool) => {
          const isDefault = defaultTools.includes(tool.name);
          return (
            <FormControlLabel
              key={tool.name}
              control={
                <StyledCheckbox
                  isDefault={isDefault}
                  checked={selectedTools.includes(tool.name) || isDefault}
                  onChange={() => handleToolSelection(tool.name)}
                  disabled={isDefault}
                />
              }
              label={
                <StyledLabel isDefault={isDefault}>
                  <Typography component="span">
                    {tool.name} - <i>{tool.description}</i>
                    {isDefault && " (Default)"}
                  </Typography>
                </StyledLabel>
              }
            />
          );
        })}
      </FormGroup>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Start Learning
      </Button>
    </>
  );
};