import axios from 'axios';
import { decryptData } from './encryption';

export const generateCompletion = async (prompt, encryptedApiKey) => {
  try {
    const decryptedApiKey = decryptData(encryptedApiKey);
    
    const systemMessage = `You are an AI tutor specializing in machine learning model evaluation and improvement. 
    Your role is to provide concise, accurate feedback on a student's suggestions for improving model performance. 
    Always start by clearly stating if the suggestion is correct, partially correct, or incorrect. 
    Then briefly explain why, referencing specific metrics or scenario details. 
    If the suggestion is incorrect, provide a quick, better alternative. 
    Keep your entire response under 50 words and focused solely on evaluating the suggestion.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${decryptedApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating completion:', error);
    throw error;
  }
};