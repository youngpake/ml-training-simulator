import React, { useState, useCallback } from 'react';
import { Box, Card, CardContent, Typography, ThemeProvider, createTheme, Button, LinearProgress } from '@mui/material';
import DarkModeSwitch from './components/DarkModeSwitch';
import ApiKeyInput from './components/ApiKeyInput';
import ChartContainer from './components/ChartContainer';
import UserInput from './components/UserInput';
import Feedback from './components/Feedback';
import CelebrationModal from './components/CelebrationModal';
import HintModal from './components/HintModal';
import { encryptData } from './components/encryption';
import { generateCompletion } from './components/OpenAIApi';
import { predefinedScenarios as initialPredefinedScenarios } from './components/Scenarios';

const allMetrics = ['Accuracy', 'Loss', 'Validation Loss', 'Precision', 'Recall', 'F1 Score'];

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [predefinedScenarios, setPredefinedScenarios] = useState(initialPredefinedScenarios);
  const [encryptedApiKey, setEncryptedApiKey] = useState('');
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [apiKeyEntered, setApiKeyEntered] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentScenarioImprovement, setCurrentScenarioImprovement] = useState(0);
  const [quizState, setQuizState] = useState({
    currentIteration: 1,
    modelResults: {},
    userInput: '',
    feedback: '',
    isLoading: false,
    appliedStrategies: [],
    isExcellentAnswer: false,
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#3f51b5' },
      secondary: { main: '#f50057' },
    },
  });

  const handleApiKeySubmit = useCallback((apiKey) => {
    const encrypted = encryptData(apiKey);
    setEncryptedApiKey(encrypted);
    setApiKeyEntered(true);
    startLearning();
  }, []);

  const startLearning = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      modelResults: predefinedScenarios[0].metrics,
      appliedStrategies: [],
      currentIteration: 1,
    }));
  }, [predefinedScenarios]);

  const generateHint = useCallback(() => {
    const currentScenario = predefinedScenarios[currentScenarioIndex];
    const unappliedTechniques = currentScenario.correctTechniques.filter(
      technique => !currentScenario.appliedStrategies.includes(technique)
    );
    
    if (unappliedTechniques.length > 0) {
      const randomTechnique = unappliedTechniques[Math.floor(Math.random() * unappliedTechniques.length)];
      const hint = currentScenario.hintTexts[randomTechnique];
      setCurrentHint(hint);
      setShowHintModal(true);
    }
  }, [currentScenarioIndex, predefinedScenarios]);

  const handleNextScenario = useCallback(() => {
    const nextScenarioIndex = (currentScenarioIndex + 1) % predefinedScenarios.length;
    setCurrentScenarioIndex(nextScenarioIndex);
    setCurrentScenarioImprovement(0);
    setQuizState(prev => ({
      ...prev,
      modelResults: predefinedScenarios[nextScenarioIndex].metrics,
      appliedStrategies: [],
      currentIteration: 1,
      feedback: '',
      userInput: '',
    }));
    setShowCelebration(false);
  }, [currentScenarioIndex, predefinedScenarios]);

const updateMetrics = (currentScenario, appliedStrategy) => {
  const updatedMetrics = { ...currentScenario.metrics };
  const improvementFactor = 0.25; // higher metrics for good strategies

  switch (appliedStrategy) {
    case 'Regularization':
    case 'Data Augmentation':
    case 'Early Stopping':
      // Improve validation metrics
      updatedMetrics['Validation Accuracy'] = Math.min(1, updatedMetrics['Validation Accuracy'] * (1 + improvementFactor));
      updatedMetrics['Validation Loss'] = Math.max(0, updatedMetrics['Validation Loss'] * (1 - improvementFactor));
      break;
    case 'Increase Model Complexity':
    case 'Feature Engineering':
    case 'Ensemble Methods':
      // Improve overall performance
      Object.keys(updatedMetrics).forEach(key => {
        if (key.includes('Accuracy') || key.includes('Precision') || key.includes('Recall') || key.includes('F1') || key.includes('AUC')) {
          updatedMetrics[key] = Math.min(1, updatedMetrics[key] * (1 + improvementFactor));
        } else if (key.includes('Loss')) {
          updatedMetrics[key] = Math.max(0, updatedMetrics[key] * (1 - improvementFactor));
        }
      });
      break;
    case 'Resampling':
    case 'Class Weighting':
    case 'SMOTE':
      // Improve balance-related metrics
      updatedMetrics['Recall'] = Math.min(1, updatedMetrics['Recall'] * (1 + improvementFactor * 2));
      updatedMetrics['F1 Score'] = Math.min(1, updatedMetrics['F1 Score'] * (1 + improvementFactor));
      break;
    case 'Data Cleaning':
    case 'Robust Loss Functions':
      // Improve overall performance slightly
      Object.keys(updatedMetrics).forEach(key => {
        if (key.includes('Accuracy') || key.includes('Precision') || key.includes('Recall') || key.includes('F1') || key.includes('AUC')) {
          updatedMetrics[key] = Math.min(1, updatedMetrics[key] * (1 + improvementFactor / 2));
        } else if (key.includes('Loss')) {
          updatedMetrics[key] = Math.max(0, updatedMetrics[key] * (1 - improvementFactor / 2));
        }
      });
      break;
    case 'Hierarchical Classification':
    case 'One-vs-Rest Strategy':
    case 'Error Analysis':
      // Improve multiclass-specific metrics
      updatedMetrics['Accuracy'] = Math.min(1, updatedMetrics['Accuracy'] * (1 + improvementFactor));
      updatedMetrics['F1 Score'] = Math.min(1, updatedMetrics['F1 Score'] * (1 + improvementFactor));
      break;
    default:
      break; // ignore if the strategy is not known
  }

  return updatedMetrics;
};

const handleSubmit = useCallback(async () => {
  setQuizState(prev => ({ ...prev, isLoading: true, isExcellentAnswer: false }));

  try {
    const currentScenario = { ...predefinedScenarios[currentScenarioIndex] };
    const metricsData = Object.entries(currentScenario.metrics)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    const prompt = `
      You are evaluating a student's understanding of machine learning model improvement.
      Scenario: ${currentScenario.name}
      Metrics: ${metricsData}
      Applied strategies: ${currentScenario.appliedStrategies.join(', ') || 'None'}
      Correct techniques: ${currentScenario.correctTechniques.join(', ')}

      Student's suggestion: "${quizState.userInput}"

      Evaluate if the student's suggestion matches any of the correct techniques for this scenario.
      If it matches, state which of the correct techniques it matches and why, please quote the exact spelling from the correct technique listed above.
      If it doesn't match, explain why it's not appropriate for this scenario and suggest one of the correct techniques.

      Keep your response under 50 words, focused only on evaluating the suggestion.
    `;

    const feedback = await generateCompletion(prompt, encryptedApiKey); // Call OpenAI API

    const sanitizeString = (str) => str.replace(/["'.]/g, '').toLowerCase(); // Ignore quotes, periods and case
    const matchedTechnique = currentScenario.correctTechniques.find(technique => 
      sanitizeString(feedback).includes(sanitizeString(technique))
    );

    const isCorrect = matchedTechnique !== undefined;

    const updatedScenario = { ...currentScenario };
    if (isCorrect && !updatedScenario.appliedStrategies.includes(matchedTechnique)) {
      updatedScenario.appliedStrategies.push(matchedTechnique);
      const progressIncrement = 100 / currentScenario.correctTechniques.length;
      updatedScenario.currentImprovement = Math.min(100, updatedScenario.currentImprovement + progressIncrement);
      
      updatedScenario.metrics = updateMetrics(updatedScenario, matchedTechnique);
    }

    const isScenarioCompleted = updatedScenario.appliedStrategies.length === updatedScenario.correctTechniques.length;

    const updatedScenarios = [...predefinedScenarios];
    updatedScenarios[currentScenarioIndex] = updatedScenario;

    setPredefinedScenarios(updatedScenarios);

    setQuizState(prev => ({
      ...prev,
      feedback: feedback,
      isLoading: false,
      isExcellentAnswer: isCorrect,
      modelResults: updatedScenarios[currentScenarioIndex].metrics,
      currentIteration: isScenarioCompleted ? 1 : prev.currentIteration + 1,
    }));

    setCurrentScenarioImprovement(updatedScenario.currentImprovement);

    if (isScenarioCompleted) {
      setShowCelebration(true);
    }

  } catch (error) {
    console.error('Error:', error);
    setQuizState(prev => ({
      ...prev,
      feedback: 'Error generating feedback. Please try again.',
      isLoading: false,
    }));
  }
}, [quizState.userInput, encryptedApiKey, currentScenarioIndex, predefinedScenarios]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="div" color="primary" fontWeight="bold">
                Model Evaluation Practice
              </Typography>
              <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Box>
            
            {!apiKeyEntered ? (
              <ApiKeyInput handleApiKeySubmit={handleApiKeySubmit} />
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" color="secondary">
                    Scenario {currentScenarioIndex + 1}: {predefinedScenarios[currentScenarioIndex].name}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={generateHint}
                    disabled={quizState.isLoading}
                  >
                    Get Hint
                  </Button>
                </Box>
                
                <Typography variant="body1">
                  {predefinedScenarios[currentScenarioIndex].description}
                </Typography>
                
                <ChartContainer 
                  quizState={quizState} 
                  theme={theme} 
                  currentScenario={predefinedScenarios[currentScenarioIndex]}
                  selectedTools={allMetrics}
                />
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                    Applied strategies: {predefinedScenarios[currentScenarioIndex].appliedStrategies.join(', ') || 'None'}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={currentScenarioImprovement} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="caption" align="right" display="block" sx={{ mt: 0.5 }}>
                    Progress: {currentScenarioImprovement.toFixed(0)}%
                  </Typography>
                </Box>
                <Feedback 
                  feedback={quizState.feedback} 
                  isExcellentAnswer={quizState.isExcellentAnswer}
                />
                <UserInput
                  userInput={quizState.userInput}
                  setQuizState={setQuizState}
                  handleSubmit={handleSubmit}
                  isLoading={quizState.isLoading}
                />
              </>
            )}
          </CardContent>
        </Card>
        
        <CelebrationModal
          open={showCelebration}
          onClose={() => setShowCelebration(false)}
          onNext={handleNextScenario}
          scenarioName={predefinedScenarios[currentScenarioIndex].name}
        />
        
        <HintModal
          open={showHintModal}
          onClose={() => setShowHintModal(false)}
          hint={currentHint}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;