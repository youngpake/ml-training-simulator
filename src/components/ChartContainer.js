import React from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Tooltip
} from 'recharts';

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const MetricName = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: '1rem',
  fontWeight: 'bold',
}));

const ChartContainer = ({ quizState, theme, currentScenario, selectedTools }) => {
  const getColor = (value) => {
    if (value > 0.8) return theme.palette.success.main;
    if (value > 0.6) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const renderMetricChart = (metricName, value) => {
    if (value === undefined || value === null) {
      return (
        <Typography variant="body1" color="error">
          No data available
        </Typography>
      );
    }

    const color = getColor(value);
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={value * 100}
          size={120}
          thickness={4}
          sx={{ color: color }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {value.toFixed(2)}
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Higher is better
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderLossMetric = (metricName, value, maxLoss) => {
    if (value === undefined || value === null || maxLoss === undefined || maxLoss === null) {
      return (
        <Typography variant="body1" color="error">
          No data available
        </Typography>
      );
    }

    const percentage = (value / maxLoss) * 100;
    const color = getColor(1 - percentage / 100); // Invert the color scale for loss
    return (
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={120}
          thickness={4}
          sx={{ color: color }}
        />
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div" color="text.primary">
            {value.toFixed(2)} / {maxLoss.toFixed(2)}
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            {percentage.toFixed(1)}% of max loss
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Lower is better
          </Typography>
        </Box>
      </Box>
    );
  };

  const prepareRadarChartData = (metrics) => {
    return Object.entries(metrics)
      .filter(([key, value]) => !key.toLowerCase().includes('loss') && value !== undefined && value !== null && selectedTools.includes(key))
      .map(([key, value]) => ({
        metric: key,
        value: value,
        fullMark: 1,
      }));
  };

  const radarChartData = prepareRadarChartData(quizState.modelResults);

  const filteredMetrics = Object.entries(quizState.modelResults)
    .filter(([key, value]) => selectedTools.includes(key) && value !== undefined && value !== null);

    const nonLossMetrics = filteredMetrics.filter(([key]) => !key.toLowerCase().includes('loss'));
    const lossMetrics = filteredMetrics.filter(([key]) => key.toLowerCase().includes('loss'));

  const maxLossValues = {
    'Training Loss': 1.0,
    'Validation Loss': 1.0,
  };

  return (
    <Box sx={{ mb: 4 }}>      
      {/* Radar Chart for non-loss metrics */}
      {radarChartData.length > 0 && (
        <MetricCard elevation={3} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Overall Performance</Typography>
          <ResponsiveContainer width="100%" height={325}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
              <PolarGrid stroke={theme.palette.divider} />
              <PolarAngleAxis dataKey="metric" stroke={theme.palette.text.secondary} />
              <PolarRadiusAxis angle={30} domain={[0, 1]} stroke={theme.palette.text.secondary} />
              <Radar name="Model" dataKey="value" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
              <Radar name="Target" dataKey="fullMark" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} fillOpacity={0.1} />
              <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper }} />
            </RadarChart>
          </ResponsiveContainer>
        </MetricCard>
      )}

      {/* Non-loss metric charts */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {nonLossMetrics.map(([key, value], index) => (
          <Grid item xs={12} sm={6} md={nonLossMetrics.length <= 4 ? 6 : 4} key={key}>
            <MetricCard elevation={3} sx={{ height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderMetricChart(key, value)}
              </Box>
              <MetricName>{key}</MetricName>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      {lossMetrics.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>Loss Metrics</Typography>
          <Grid container justifyContent="center" spacing={2}>
            {lossMetrics.map(([key, value], index) => (
              <Grid item xs={12} sm={6} md={lossMetrics.length <= 2 ? 6 : 4} key={key}>
                <MetricCard elevation={3} sx={{ height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {renderLossMetric(key, value, maxLossValues[key] || 1.0)}
                  <MetricName>{key}</MetricName>
                </MetricCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Scenario Progress */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>Scenario Progress</Typography>
        <LinearProgress 
          variant="determinate" 
          value={Math.round(currentScenario.currentImprovement)} 
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Current Improvement: {Math.round(currentScenario.currentImprovement)}%
        </Typography>
      </Box>
    </Box>
  );
};

export default ChartContainer;