// src/services/openAI.js
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const config = require('../config/azure-config');

const openAIClient = new OpenAIClient(
  config.openAI.endpoint,
  new AzureKeyCredential(config.openAI.apiKey)
);

async function generateResponse(prompt, maxTokens = 500) {
  const response = await openAIClient.getCompletions(config.openAI.deploymentName, [prompt], {
    maxTokens: maxTokens
  });
  
  return response.choices[0].text.trim();
}

async function summarizeDocument(text, maxTokens = 200) {
  const prompt = `Summarize the following legal document in ${maxTokens} tokens or less:\n\n${text}`;
  return generateResponse(prompt, maxTokens);
}

module.exports = {
  generateResponse,
  summarizeDocument
};