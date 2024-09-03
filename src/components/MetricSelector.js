import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const MetricSelector = ({ selectedMetrics, handleMetricChange, availableMetrics }) => {
  const handleChange = (event) => {
    const metric = event.target.name;
    if (event.target.checked) {
      handleMetricChange([...selectedMetrics, metric]);
    } else {
      handleMetricChange(selectedMetrics.filter(m => m !== metric));
    }
  };

  return (
    <FormGroup row>
      {availableMetrics.map(metric => (
        <FormControlLabel
          key={metric}
          control={
            <Checkbox
              checked={selectedMetrics.includes(metric)}
              onChange={handleChange}
              name={metric}
            />
          }
          label={metric.replace(/([A-Z])/g, ' $1').trim()}
        />
      ))}
    </FormGroup>
  );
};

export default MetricSelector;