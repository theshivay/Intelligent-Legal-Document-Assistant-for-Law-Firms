// src/utils/langchainSetup.js
const { OpenAI } = require('langchain/llms/openai');
const { RetrievalQAChain } = require('langchain/chains');
const { AzureCognitiveSearchRetriever } = require('langchain/retrievers/azure_cognitive_search');
const config = require('../config/azure-config');

const model = new OpenAI({
  temperature: 0.2,
  azureOpenAIApiKey: config.openAI.apiKey,
  azureOpenAIApiInstance: config.openAI.endpoint,
  azureOpenAIApiDeploymentName: config.openAI.deploymentName,
  azureOpenAIApiVersion: '2023-05-15',
});

const retriever = new AzureCognitiveSearchRetriever({
  endpoint: config.cognitiveSearch.endpoint,
  key: config.cognitiveSearch.apiKey,
  indexName: config.cognitiveSearch.indexName,
});

const chain = RetrievalQAChain.fromLLM(model, retriever);

async function queryLegalAssistant(query) {
  const response = await chain.call({ query });
  return response.text;
}

module.exports = {
  queryLegalAssistant
};